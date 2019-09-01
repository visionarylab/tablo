import React, { FC } from 'react';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Header from 'components/Header/Header';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app-wrapper">
        <Header className="app-header"/>
        <PictureViewer className="app-content"/>
    </div>
  );
}

export default App;
