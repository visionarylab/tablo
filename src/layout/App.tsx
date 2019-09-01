import React, { FC } from 'react';
// import Header from './Header/Header';
// import { Sidebar } from './Sidebar/Sidebar';
// import Content from './Content/Content';
import './App.scss';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Toolbar from './Toolbar/Toolbar';

const App: FC = () => {
  return (
    <div className="app-wrapper">

        <Toolbar className="app-header"/>

        <PictureViewer className="app-content"/>

        {/*
        <Header />
        <div className="app-content-wrapper">
            <div className="app-sidebar">
            <Sidebar/>
            </div>

          <div className="app-content">
            <Content/>
          </div>
        </div>
        */}

    </div>
  );
}

export default App;
