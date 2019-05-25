import React, { Component } from 'react';
import AppPicture from 'components/Picture/Picture'

import './Sidebar.scss';

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-wrapper">
                <AppPicture />
            </div>
        );
    }
}
