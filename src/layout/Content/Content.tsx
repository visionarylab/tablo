import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { toggleExpandBookmarkFolder, toggleExpandBookmarkFolderAll, searchBookmark, Folder as FolderType } from 'store/bookmarks';
import { SearchInputBookmarks } from 'components/SearchInputBookmarks/SearchInputBookmarks';
import { Folder } from 'components/Folder/Folder';
import { Button } from 'components/Buttons/Button';

import './Content.scss';

interface Props {
    folders: FolderType[];
    foldersFiltered: FolderType[];
    isAllExpanded: boolean;
    query: string;
    onSearchBookmarks: (query: string) => void;
    toggleExpandFolder: (folderId: string) => void;
    toggleExpandFolderAll: () => void;
}

interface state {
}

class Content extends Component<Props, state> {
    static defaultProps: Props = {
        folders: [],
        foldersFiltered: [],
        isAllExpanded: false,
        query: '',
        onSearchBookmarks: (query: string) => {},
        toggleExpandFolder: (folderId: string) => {},
        toggleExpandFolderAll: () => {}
    };

    render() {
        const {
            foldersFiltered,
            query,
            isAllExpanded,
            onSearchBookmarks,
            toggleExpandFolder,
            toggleExpandFolderAll
        } = this.props;
        return (
            <div className="content-wrapper">
                <div className="header">
                    <SearchInputBookmarks
                        onChange={(evt: any) => onSearchBookmarks(evt.target.value)}
                        query={query} />

                    <Button isIcon={false} className="toggle-expand-btn" onClick={toggleExpandFolderAll}>
                        { isAllExpanded ? 'Collapse all' : 'Expand all' }
                    </Button>
                </div>

                <div className="content">
                    {
                    foldersFiltered
                        .map((folder: any) => (<Folder
                            key={folder.id}
                            folder={folder}
                            toggleExpandFolder={toggleExpandFolder}/>)
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        folders: rootState.bookmarkState.folders,
        foldersFiltered: rootState.bookmarkState.foldersFiltered,
        isAllExpanded: rootState.bookmarkState.isAllExpanded,
        query: rootState.bookmarkState.query
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onSearchBookmarks: (query: string) => dispatch(searchBookmark(query)),
    toggleExpandFolder: (folderId: string) => dispatch(toggleExpandBookmarkFolder(folderId)),
    toggleExpandFolderAll: () => dispatch(toggleExpandBookmarkFolderAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);