import React, { FC } from 'react';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Toolbar from 'components/Toolbar/Toolbar';
import Settings from 'components/Settings/Settings';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app-wrapper">
        <Toolbar className="app-header"/>
        <PictureViewer className="app-content"/>
        <Settings/>
    </div>
  );
}

export default App;
