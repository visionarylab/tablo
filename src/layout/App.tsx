import React, { FC } from 'react';
import styled from 'styled-components'
import Header from 'components/Header';
import Sidebar from './Sidebar/Sidebar';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Modals from 'components/Modals';

export const AppWrapper = styled.div`
    margin: 0 auto;
    padding: var(--gridMargin);
    height: 100%;
    max-height: 500px;
    width: 100%;
    max-width: 800px;
`;

export const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-row-gap: var(--gridMargin);
    grid-column-gap: var(--gridMargin);
    grid-template-rows: var(--rowHeight) calc(100% - var(--rowHeight) - var(--gridMargin));
    grid-template-columns: repeat(2, 50%);
`;

export const AppHeader = styled.div`
    grid-area: 1 / 1 / 2 / 3;
    height: var(--rowHeight);
    width: 100%;
    background: rgba(0, 0, 0, .2);
`;

export const AppLeft = styled.div`
    grid-area: 2 / 1 / 3 / 2;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .2);
    overflow: hidden;
    position: relative;
`;

export const AppRight = styled.div`
    grid-area: 2 / 2 / 3 / 3;
    height: 100%;
    max-height: calc(100%);
    width: 100%;
    background: rgba(0, 0, 0, .2);
`;

const App: FC = () => (
    <AppWrapper>
    <AppContainer>
        <AppHeader>
        <Header />
        </AppHeader>

        <AppLeft>
        <Sidebar />
        <Modals />
        </AppLeft>

        <AppRight>
        <PictureViewer />
        </AppRight>
    </AppContainer>
    </AppWrapper>
);

export default App;
