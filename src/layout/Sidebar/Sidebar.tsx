import React, { Component } from 'react';
import './Sidebar.scss';
import { AppPicture } from 'components/Picture/Picture'



export class Sidebar extends Component {
    render() {
      return (
        <div className="sidebar-wrapper">
          <AppPicture/>
        </div>
      );
    }
}
