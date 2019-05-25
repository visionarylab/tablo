import React, { Component } from 'react';
import api from 'api';

import './FolderItem.scss';

interface Props {
    item: any;
}

export class FolderItem extends Component<Props> {

    constructor(props: any) {
        super(props);

        this.openBookmark = this.openBookmark.bind(this);
    }

    openBookmark() {
        const { item } = this.props;
        window.open(item.url, '_blank');
    }

    render() {
        const { item } = this.props;
        const title = item.title ? item.title : item.url.split('://')[1]
        return (
            <div className="folder-item-wrapper" onClick={this.openBookmark}>
                { item.url &&
                <img src={api.favicon.getFaviconUrl(item.url)} alt=""/>
                }
                <div className="item-title">{title}</div>
            </div>
        );
    }
}
