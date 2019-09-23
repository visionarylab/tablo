import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { closeAllSidebarSidebar } from 'store/ui';

import Modal from 'components/Modal/Modal';
import Bookmarks from 'components/Bookmarks/Bookmarks';
import PictureCartel from 'components/PictureCartel/PictureCartel';
import PictureHistorique from 'components/PictureHistorique/PictureHistorique';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Settings from 'components/Settings/Settings';

import './Content.scss';

interface Props {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    closeAllSidebarSidebar: () => void;
}

interface State {
}

class Content extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        showSettings: false,
        showBookmarks: false,
        showDetails: false,
        showHistory: false,
        closeAllSidebarSidebar: () => { },
    };

    constructor(props: any) {
        super(props);
    }


    render() {
        const {
            className,
            showSettings,
            showBookmarks,
            showDetails,
            showHistory,
            closeAllSidebarSidebar
        } = this.props;
        // const { } = this.state;

        const contentClass = classNames('content-wrapper', className)

        return (
            <div className={contentClass}>
                <PictureViewer />

                <Modal
                    title="Settings"
                    show={showSettings}
                    onHide={closeAllSidebarSidebar}>
                    <Settings/>
                </Modal>

                <Modal
                    title="Bookmarks"
                    show={showBookmarks}
                    onHide={closeAllSidebarSidebar}>
                    <Bookmarks />
                </Modal>

                <Modal
                    title="Details"
                    show={showDetails}
                    onHide={closeAllSidebarSidebar}>
                    <PictureCartel />
                </Modal>

                <Modal
                    title="History"
                    show={showHistory}
                    onHide={closeAllSidebarSidebar}>
                    <PictureHistorique />
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        showSettings: state.uiState.showSettings,
        showBookmarks: state.uiState.showBookmarks,
        showDetails: state.uiState.showDetails,
        showHistory: state.uiState.showHistory,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    closeAllSidebarSidebar: () => dispatch(closeAllSidebarSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
