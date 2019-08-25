import React, { Component } from 'react';
import PictureViewer from 'components/PictureViewer/PictureViewer'

import './Sidebar.scss';

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-wrapper">
                <PictureViewer />
            </div>
        );
    }
}
