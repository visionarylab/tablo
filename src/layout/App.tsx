import React, { FC } from 'react';

import Header from './Header/Header';
import SidebarLeft from './Sidebar/SidebarLeft';
import SidebarRight from './Sidebar/SidebarRight';
import Content from './Content/Content';

import './App.scss';

const App: FC = () => {

    return (
        <div className="app-wrapper">
            <SidebarLeft className="app-sidebar sidebar-left">
                hello
            </SidebarLeft>

            <Header className="header" />
            <Content className="content" />

            <SidebarRight className="app-sidebar sidebar-right">
                hello
            </SidebarRight>
        </div>
    );
}

export default App;
