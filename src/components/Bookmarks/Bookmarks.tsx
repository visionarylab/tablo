import React, { Component } from 'react';
import { connect } from 'react-redux';

import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css';

import { RootState } from 'store/rootReducer';
import { searchBookmark } from 'store/bookmarks';
import './Bookmarks.scss';

interface Props {
    data: any;
    query: string;
    searchBookmark: (query: string) => void
}

interface State {
    bookmarks: any;
    searchString: string,
    searchFocusIndex: number,
    searchFoundCount: number,
}

class Bookmarks extends Component<Props, State> {

    static defaultProps: Props = {
        data: null,
        query: '',
        searchBookmark: (query: string) => { }
    };

    constructor(props: any) {
        super(props);

        this.state = {
            bookmarks: null,
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: 0,
        }

        this.handleTreeOnChange = this.handleTreeOnChange.bind(this);
        this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
        this.searchFinishCallback = this.searchFinishCallback.bind(this);
        this.selectPrevMatch = this.selectPrevMatch.bind(this);
        this.selectNextMatch = this.selectNextMatch.bind(this);
        this.expandNodeAll = this.expandNodeAll.bind(this);
        this.collapseNodeAll = this.collapseNodeAll.bind(this);
        this.generateNodeProps = this.generateNodeProps.bind(this);
    }

    componentDidMount() {
        this.initBookmarks(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.initBookmarks(nextProps);
    }

    initBookmarks(props: Props) {
        if (props.data) {
            this.setState({ bookmarks: props.data[0].children });
        }
    }

    handleTreeOnChange(treeData: any) {
        this.setState({ bookmarks: treeData });
    };

    handleSearchOnChange(event: any) {
        this.setState({ searchString: event.target.value });
    }

    searchFinishCallback(matches: any) {
        const { searchFocusIndex } = this.state;
        this.setState({
            searchFoundCount: matches.length,
            searchFocusIndex:
            matches.length > 0 ? searchFocusIndex % matches.length : 0,
        })
    }

    selectPrevMatch() {
        const { searchFocusIndex, searchFoundCount } = this.state;
        this.setState({
            searchFocusIndex:
                searchFocusIndex !== null
                    ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
                    : searchFoundCount - 1,
        });
    };

    selectNextMatch() {
        const { searchFocusIndex, searchFoundCount } = this.state;

        this.setState({
            searchFocusIndex:
                searchFocusIndex !== null
                    ? (searchFocusIndex + 1) % searchFoundCount
                    : 0,
        });
    };


    expandNodeAll() {
        const { bookmarks } = this.state;
        this.setState({
            bookmarks: toggleExpandedForAll({ treeData: bookmarks, expanded: true }),
        });
    };

    collapseNodeAll() {
        const { bookmarks } = this.state;
        this.setState({
            bookmarks: toggleExpandedForAll({ treeData: bookmarks, expanded: false }),
        });
    };

    generateNodeProps(rowInfo: any) {
         return {
            buttons: [
              <button
                className="btn btn-outline-success"
                style={{ verticalAlign: 'middle' }}
                onClick={() => {
                     console.log('rowInfo', rowInfo)
                }}>
                Hello
              </button>,
            ],
          }
    }

    render() {
        const {
            bookmarks,
            searchString,
            searchFocusIndex,
            searchFoundCount } = this.state;

        if (!bookmarks) {
            return (null);
        }

        return (
            <div className="bookmarks-wrapper">

                <div className="bookmarks-header">
                    <button onClick={this.expandNodeAll}>
                        Expand all
                    </button>
                    <button
                        className="collapse"
                        onClick={this.collapseNodeAll}>
                        Collapse all
                    </button>
                    <input type="text" name="" id=""
                        value={searchString}
                        onChange={this.handleSearchOnChange}
                    />
                    <button className="previous" onClick={this.selectPrevMatch}>
                        Previous
                    </button>
                    <button className="next" onClick={this.selectNextMatch}>
                        Next
                    </button>

                    <label>
                        {searchFocusIndex} / {searchFoundCount}
                    </label>
                </div>

                <SortableTree
                    treeData={bookmarks}
                    theme={FileExplorerTheme}
                    searchQuery={searchString}
                    searchFocusOffset={searchFocusIndex}
                    searchFinishCallback={this.searchFinishCallback}
                    canDrag={false}
                    getNodeKey={({ node }) => node.id}

                    onChange={this.handleTreeOnChange}
                    generateNodeProps={this.generateNodeProps}
                />
            </div>
        );
    }
}

/*
theme={{
                        ...FileExplorerTheme,
                        rowHeight: 50,
                        innerStyle: {
                            borderColor: '3px solid blue'
                        }
                       /  nodeContentRenderer: (infos: any) => {
                            console.log('nodeContentRenderer', infos)
                            return (
                                <div>
                                    hello
                                </div>
                            )
                        } /
                    }}
*/

const mapStateToProps = (rootState: RootState) => {
    return {
        data: rootState.bookmarkState.bookmarks,
        query: rootState.bookmarkState.query
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    searchBookmark: (query: string) => dispatch(searchBookmark(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);


