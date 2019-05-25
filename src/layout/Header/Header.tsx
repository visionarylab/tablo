import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchEngine, selectSearchEngine } from 'store/search';
import SearchEngineMenu from 'components/SearchEngineMenu/SearchEngineMenu';
import SearchInput from 'components/SearchInput/SearchInput';

import './Header.scss';
import { RootState } from 'store/rootReducer';
import Settings from 'components/Settings/Settings';

interface Props {
  searchEngines: SearchEngine[];
  selectedSearchEngineId: string | null | undefined;
  searchInNewTab: boolean;
  onSelectSearchEngine: (evt: any) => any;
}

interface State {
}

class Header extends Component<Props, State> {

  static defaultProps: Props = {
    searchEngines: [],
    selectedSearchEngineId: null,
    searchInNewTab: true,
    onSelectSearchEngine: (evt: any) => { },
  };

  constructor(props: any) {
    super(props);

    this.onSearchEngineChange = this.onSearchEngineChange.bind(this);
  }

  onSearchEngineChange(searchEngine: SearchEngine | null) {
    if (searchEngine) {
      this.props.onSelectSearchEngine(searchEngine.id);
    }
  }

  getSelectedSearchEngine(searchEngines: SearchEngine[], selectedSearchEngineId: string | any) {
    return searchEngines.find((item: SearchEngine) => item.id === selectedSearchEngineId);
  }

  render() {
    const { searchEngines, selectedSearchEngineId, searchInNewTab } = this.props;
    const currentSearchEngine = this.getSelectedSearchEngine(searchEngines, selectedSearchEngineId);

    return (
      <div className="header-wrapper">
        <SearchEngineMenu
          searchEngines={searchEngines}
          selectedSearchEngine={currentSearchEngine}
          onSearchEngineChange={this.onSearchEngineChange}
        />

        <SearchInput
          selectedSearchEngine={currentSearchEngine}
          searchInNewTab={searchInNewTab}
        />

        <Settings />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    searchEngines: state.searchState.searchEngines,
    selectedSearchEngineId: state.searchState.selectedSearchEngineId,
    searchInNewTab: state.searchState.searchInNewTab
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  onSelectSearchEngine: (payload: any) => dispatch(selectSearchEngine(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
