import React, { FC, HTMLAttributes } from 'react';
import { FlexContainer } from 'components/ui';
import ContentHeader from 'components/ContentHeader';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Modals from 'components/Modals';

const Content: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => (
    <FlexContainer className={className} direction="column">
        <ContentHeader/>
        <PictureViewer/>
        <Modals/>
    </FlexContainer>
);

export default Content
