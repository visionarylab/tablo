import React, { FC } from 'react';

import Header from './Header/Header';
import BrowserSidebar from './Sidebar/BrowserSidebar';
import UserSidebar from './Sidebar/UserSidebar';
import Content from './Content/Content';

import './App.scss';

const App: FC = () => (
    <div className="app-wrapper">
        <BrowserSidebar className="app-sidebar sidebar-left"/>
        <Header className="header" />
        <Content className="content" />
        <UserSidebar className="app-sidebar sidebar-right"/>
    </div>
);

export default App;
