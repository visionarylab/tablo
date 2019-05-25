import React, { FC } from 'react';
import Header from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import Content from './Content/Content';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app-wrapper">
        <div className="app-header">
        <Header/>
        </div>

        <div className="app-content-wrapper">
            <div className="app-sidebar">
            <Sidebar/>
            </div>

            <div className="app-content">
            <Content/>
            </div>
        </div>
    </div>
  );
}

export default App;
