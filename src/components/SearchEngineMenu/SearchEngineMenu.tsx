import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SearchEngine } from 'store/search';

import './SearchEngineMenu.scss';

interface Props {
    searchEngines: SearchEngine[];
    selectedSearchEngine: SearchEngine | null;
    onSearchEngineChange?: (searchEngine: SearchEngine | null) => void;
}

interface State {
    query: string;
    searchInputPlaceHolder: string;
}

class SearchEngineMenu extends Component<Props, State> {

    static defaultProps: Props = {
        searchEngines: [],
        selectedSearchEngine: null,
    };

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt: any): void {
        if (evt.value && this.props.onSearchEngineChange) {
            this.props.onSearchEngineChange(evt.value);
        }
    }

    render() {
        const { searchEngines, selectedSearchEngine } = this.props;

        return (
            <div className="search-engine-menu-wrapper">
                <Dropdown
                    placeholder="Choose a search engine"
                    optionLabel="name"
                    dataKey="id"
                    value={selectedSearchEngine}
                    options={searchEngines}
                    onChange={this.handleChange}>
                </Dropdown>
            </div>
        );
    }
}

export default SearchEngineMenu;
