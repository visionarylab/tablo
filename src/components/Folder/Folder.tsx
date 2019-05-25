import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import classnames from 'classnames';
import AnimateHeight from 'react-animate-height';
import { FolderItem } from 'components/FolderItem/FolderItem';
import { Button } from 'components/Buttons/Button';

import './Folder.scss';

interface Props {
    folder: any;
    toggleExpandFolder: (folderId: string) => void;
}

interface State {
}

export class Folder extends Component<Props, State> {
    render() {
        const { folder, toggleExpandFolder } = this.props;

        if (folder.children.length === 0) {
            return (null);
        }

        const classNames = classnames('folder-wrapper', {
            'folder-expanded': folder.isExpanded
        });
        return (
            <div className={classNames}>
                <div className="folder-title" onClick={() => toggleExpandFolder(folder.id)}>
                    {folder.title + ` (${folder.children.length })`}
                    <Button isIcon={true} className="search-bookmarks-icon">
                        <Icon path={mdiChevronDown} size={1} color="white" />
                    </Button>
                </div>

                <AnimateHeight
                    className="folder-children"
                    duration={300}
                    height={folder.isExpanded ? 'auto' : 0}>
                    {folder.children.map((item: any) => (<FolderItem key={item.id} item={item} />))}
                </AnimateHeight>
            </div>
        );
    }
}
