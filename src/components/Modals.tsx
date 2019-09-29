import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { closeAll } from 'store/ui/ui';
import Modal from './Modal';
import Settings from './Settings/Settings';
import Bookmarks from './Bookmarks/Bookmarks';
import PictureCartel from './PictureCartel';
import PictureHistorique from './PictureHistorique';
import Edit from './Edit/Edit';

interface Props {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    showAddSectionItem: boolean;
    closeAll: () => void;
}

class Modals extends Component<Props> {

    static defaultProps: Props = {
        showSettings: false,
        showBookmarks: false,
        showDetails: false,
        showHistory: false,
        showAddSectionItem: false,
        closeAll: () => { },
    };

    render() {
        const {
            showSettings,
            showBookmarks,
            showDetails,
            showHistory,
            showAddSectionItem,
            closeAll } = this.props;

        return (
           <>
                <Modal
                    title="Settings"
                    show={showSettings}
                    onHide={closeAll}>
                    <Settings/>
                </Modal>

                <Modal
                    title="Bookmarks"
                    show={showBookmarks}
                    onHide={closeAll}>
                    <Bookmarks />
                </Modal>

                <Modal
                    title="Details"
                    show={showDetails}
                    onHide={closeAll}>
                    <PictureCartel />
                </Modal>

                <Modal
                    title="History"
                    show={showHistory}
                    onHide={closeAll}>
                    <PictureHistorique />
                </Modal>

                <Modal
                    title="Sidebar"
                    show={showHistory}
                    onHide={closeAll}>
                    <PictureHistorique />
                </Modal>

                <Modal
                    title="Edit"
                    show={showAddSectionItem}
                    onHide={closeAll}>
                    <Edit />
                </Modal>
           </>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        showSettings: state.uiState.showSettings,
        showBookmarks: state.uiState.showBookmarks,
        showDetails: state.uiState.showDetails,
        showHistory: state.uiState.showHistory,
        showAddSectionItem: state.uiState.showAddSectionItem,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    closeAll: () => dispatch(closeAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
