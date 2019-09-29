import React, { Component, FC } from 'react';
import Icon from '@mdi/react';
import { mdiFolderOpen, mdiFolder } from '@mdi/js';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { searchBookmark } from 'store/bookmarks/bookmarks';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';
import './Bookmarks.scss';
import { Toolbar, IconButton, Text, Input, FlexSeparator, SidebarItem, SidebarItemIcon, FlexContainer } from 'components/ui';

const TreeItem: FC<any> = ({ node, click, level = 0 }) => {
    if (!node) {
        return (null);
    }
    return (
        <FlexContainer direction="column">
            <SidebarItem paddingLeft={`calc(35px * ${level})`}
                onClick={() => {click(node)}}>
            {node.children &&
                <SidebarItemIcon>
                    <Icon path={node.expanded ? mdiFolderOpen : mdiFolder} size="var(--iconSize)" color="var(--color)" />
                </SidebarItemIcon>
                }

                {!node.children &&
                <SidebarItemIcon>
                    <FaviconWrapper url={node.url}/>
                </SidebarItemIcon>
                }
                <Text>{node.title}</Text>
            </SidebarItem>

            {node.children && node.expanded &&
            <FlexContainer direction="column">
                {node.children.map((childNode: any) => {
                    return (<TreeItem level={level + 1} key={childNode.id} node={childNode} click={click}/>);
                })}
            </FlexContainer>
            }
        </FlexContainer>
    );
};

interface Props {
    data: any;
    query: string;
    searchBookmark: (query: string) => void
}

interface State {
    treeData: any;
    searchString: string;
    isAllExpanded: boolean;
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
            isAllExpanded: false,
        }

        this.handleTreeOnChange = this.handleTreeOnChange.bind(this);
        this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
        this.searchFinishCallback = this.searchFinishCallback.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.handleClickNode = this.handleClickNode.bind(this);
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

    }

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
        this.setState({ treeData, isAllExpanded: expanded });
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

    render() {
        const {
            treeData,
            searchString } = this.state;

        const { isAllExpanded } = this.state;

        if (!treeData) {
            return (null);
        }

        return (
            <div className="bookmarks-wrapper">

                <Toolbar className="bookmarks-header">
                    <Input type="text" name="" id=""
                        value={searchString}
                        onChange={this.handleSearchOnChange}
                    />

                    <FlexSeparator/>

                    { !isAllExpanded &&
                    <IconButton onClick={this.expandAll}>
                        <Text>Expand all</Text>
                    </IconButton>
                    }

                    { isAllExpanded &&
                    <IconButton onClick={this.collapseAll}>
                        <Text>Collapse all</Text>
                    </IconButton>
                    }

                </Toolbar>

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

            </div>
        );
    }
}

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


