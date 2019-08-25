import React, { FC } from 'react';
// import Header from './Header/Header';
// import { Sidebar } from './Sidebar/Sidebar';
// import Content from './Content/Content';
import './App.scss';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Settings from 'components/Settings/Settings';

const App: FC = () => {
  return (
    <div className="app-wrapper">

        <Settings></Settings>

        <div className="app-content">
        <PictureViewer />
        </div>

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
