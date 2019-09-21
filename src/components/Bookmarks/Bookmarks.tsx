import React, { Component, FC } from 'react';
import Icon from '@mdi/react';
import { mdiFolderOpen, mdiFolder } from '@mdi/js';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { searchBookmark } from 'store/bookmarks';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';
import './Bookmarks.scss';

const TreeItem: FC<any> = ({ node, click }) => {
    if (!node) {
        return (null);
    }
    return (
        <div className="tree-item-wrapper">
            <div className="tree-item" onClick={() => {click(node)}}>
            {node.children &&
                <div className="tree-item-icon">
                    <Icon path={node.expanded ? mdiFolderOpen : mdiFolder} size={0.7} color="white" />
                </div>
                }

                {!node.children &&
                <FaviconWrapper className="tree-item-img" url={node.url}/>
                }
                <div className="tree-item-title">{node.title}</div>
            </div>

            {node.children && node.expanded &&
                <div className="tree-item-children">

                    {node.children.map((childNode: any) => {
                        return (<TreeItem key={childNode.id} node={childNode} click={click}/>);
                    })}

                </div>
            }
        </div>
    );
};

interface Props {
    data: any;
    query: string;
    searchBookmark: (query: string) => void
}

interface State {
    treeData: any;
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
            treeData: null,
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: 0,
        }

        this.handleTreeOnChange = this.handleTreeOnChange.bind(this);
        this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
        this.searchFinishCallback = this.searchFinishCallback.bind(this);
        this.selectPrevMatch = this.selectPrevMatch.bind(this);
        this.selectNextMatch = this.selectNextMatch.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.handleClickNode = this.handleClickNode.bind(this);
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
            this.setState({ treeData: props.data[0] });
        }
    }

    handleTreeOnChange(treeData: any) {
        this.setState({ treeData: treeData });
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

    setExpandAll(expanded: boolean) {
        const { treeData } = this.state;
        const parse = (node: any) => {
            if (node.children) {
                node.expanded = expanded;
                for (let i = 0; i < node.children.length; i++) {
                    parse(node.children[i])
                }
            }
        }
        parse(treeData);
        this.setState({ treeData });
    }

    expandAll() {
        this.setExpandAll(true);
    };

    collapseAll() {
        this.setExpandAll(false);
    };

    handleClickNode(selectedNode: any) {
        const { treeData } = this.state;

        if (selectedNode.children) {
            let updated = false;
            const parse = (node: any) => {
                if (!updated) {

                    if (node.id === selectedNode.id) {
                        node.expanded = !node.expanded;
                        updated = true;
                    }

                    if (node.children) {
                        for (let i = 0; i < node.children.length; i++) {
                            parse(node.children[i])
                        }
                    }
                }
                return;
            }
            parse(treeData);
            this.setState({treeData});
        }
    }

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
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount } = this.state;

        if (!treeData) {
            return (null);
        }

        return (
            <div className="bookmarks-wrapper">

                <div className="bookmarks-header">
                    <button onClick={this.expandAll}>
                        Expand all
                    </button>
                    <button
                        className="collapse"
                        onClick={this.collapseAll}>
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

                <div className="tree-wrapper">
                    {treeData.children.map((node: any) => {
                        return (
                            <TreeItem
                                key={node.id}
                                node={node}
                                click={this.handleClickNode}
                            />
                        );
                    })}
                </div>

                {/*

                <TreeMenu data={treeData}>
                    {({ items }) => (
                        <ul className="tree-item-group">
                            {items.map(props => (
                                <ItemComponent {...props} />
                            ))}
                        </ul>
                    )}
                </TreeMenu> */}


                {/*
                <SortableTree
                    treeData={treeData}
                    theme={FileExplorerTheme}
                    searchQuery={searchString}
                    searchFocusOffset={searchFocusIndex}
                    searchFinishCallback={this.searchFinishCallback}
                    canDrag={false}
                    getNodeKey={({ node }) => node.id}

                    onChange={this.handleTreeOnChange}
                    generateNodeProps={this.generateNodeProps}
                />
                */}

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


