import React, { Component } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify, mdiChevronRight } from '@mdi/js'
import { SearchEngine } from 'store/search';
import Button from 'components/Buttons/Button';

import './SearchInput.scss';

interface Props {
    selectedSearchEngine: SearchEngine | null;
    searchInNewTab: boolean;
}

interface State {
    query: string;
    searchInputPlaceHolder: string;
}

class SearchInput extends Component<Props, State> {

    static defaultProps: Props = {
        selectedSearchEngine: null,
        searchInNewTab: true,
    };

    state: State = {
        query: '',
        searchInputPlaceHolder: ''
    };

    constructor(props: any) {
        super(props);

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectedSearchEngine) {
            this.resolveSearchInputPlaceholder(nextProps.selectedSearchEngine.name);
        }
    }

    resolveSearchInputPlaceholder(searchEngineName: string) {
        this.setState({
            searchInputPlaceHolder: 'Search on ' + searchEngineName.toLowerCase()
        });
    }

    onSearchInputChange(event: any) {
        this.setState({ query: event.target.value })
    }

    onSearch() {
        if (this.state.query && this.props.selectedSearchEngine) {
            const url = this.buildUrl(this.props.selectedSearchEngine);
            if (this.props.searchInNewTab) {
                window.open(url, '_blank');
            } else {
                window.location.replace(url);
            }
        }
    }

    onKeyPress(event: any) {
        if (event.key === 'Enter') { this.onSearch(); }
    }

    buildUrl(searchEngine: SearchEngine): string {
        const params = searchEngine.params
            .filter((param: any) => param.key !== '')
            .map((param: any) => param.key + '=' + param.value);
        params.unshift(searchEngine.queryParam + '=' + this.state.query);
        return  searchEngine.baseUrl + '?' + params.join('&');
    }

    render() {
        const { query, searchInputPlaceHolder } = this.state;

        return (
            <div className="search-input-wrapper" onKeyPress={this.onKeyPress}>
                <Button isIcon={true} className="search-icon">
                    <Icon path={mdiMagnify} size={1} color="black" />
                </Button>

                <input className="input" type="text"
                    value={query}
                    placeholder={searchInputPlaceHolder}
                    onChange={this.onSearchInputChange}
                />

                <Button isIcon={true} className="btn">
                    <Icon path={mdiChevronRight} size={2} color="black" />
                </Button>
            </div>
        );
    }
}

export default SearchInput;
