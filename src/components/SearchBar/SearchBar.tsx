import React, { Component } from 'react';
import './SearchBar.scss';
import { Button } from 'components/Buttons/Button';
import Icon from '@mdi/react'
import { mdiMagnify, mdiChevronRight } from '@mdi/js'
import { Dropdown } from 'primereact/dropdown';
import { SearchEngine } from 'types/search-bar-config';
import { connect } from 'react-redux';
import { SELECT_SEARCH_ENGINE } from 'store/actionTypes';


interface Props {
    items: SearchEngine[];
    selectedItemId: string | null | undefined;
    searchInNewTab: boolean;
    onSelectSearchEngine: (evt: any) => any;
}

interface State {
    query: string;
    searchInputPlaceHolder: string;
}

class SearchBar extends Component<Props, State> {

    static defaultProps: Props = {
        items: [],
        selectedItemId: null,
        searchInNewTab: true,
        onSelectSearchEngine: (evt: any) => {}
    };

    state: State = {
        query: '',
        searchInputPlaceHolder: ''
    };

    constructor(props: any) {
        super(props);

        this.onSearchEngineChange = this.onSearchEngineChange.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onSearchEngineChange(evt: any) {
        this.props.onSelectSearchEngine(evt.value.id);
        this.setState({
            searchInputPlaceHolder: 'Search on ' + evt.value.name.toLowerCase()
        });
    }

    onSearchInputChange(event: any) {
        this.setState({ query: event.target.value })
    }

    onSearch() {
        const selectedSearchEngine = this.getSelectedSearchEngine(
            this.props.items,
            this.props.selectedItemId
        );

        if (this.state.query && selectedSearchEngine) {
            const url = this.buildUrl(selectedSearchEngine);

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

    getSelectedSearchEngine(items: SearchEngine[], selectedItemId: string | any) {
        return items.find((item: SearchEngine) => item.id === selectedItemId);
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
        const { items, selectedItemId } = this.props;

        const currentSearchEngine = this.getSelectedSearchEngine(items, selectedItemId);

        return (
            <div className="searchbar-wrapper" onKeyPress={this.onKeyPress}>
                <div className="searchbar-engines">
                    <Dropdown
                        placeholder="Choose a search engine"
                        optionLabel="name"
                        dataKey="id"
                        value={currentSearchEngine}
                        options={items}
                        onChange={this.onSearchEngineChange}>
                    </Dropdown>
                </div>

                <div className="searchbar-input">
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
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    items: state.searchBar.items,
    selectedItemId: state.searchBar.selectedItemId,
    searchInNewTab: state.searchBar.searchInNewTab
});

const mapDispatchToProps = (dispatch: any) => ({
    onSelectSearchEngine: (payload: any) => dispatch({ type: SELECT_SEARCH_ENGINE, payload })
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
