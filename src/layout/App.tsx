import React, { FC } from 'react';
import SidebarLeft from './Sidebar/SidebarLeft';
import SidebarRight from './Sidebar/SidebarRight';
import Content from './Content/Content';
import './App.scss';

const App: FC = () => (
    <div className="app-wrapper">
        <SidebarLeft className="app-sidebar sidebar-left"/>
        <Content className="content" />
        <SidebarRight className="app-sidebar sidebar-right"/>
    </div>
);

export default App;
