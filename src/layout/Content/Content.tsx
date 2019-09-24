import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { closeAll } from 'store/ui/ui';
import Modal from 'components/Modal/Modal';
import Bookmarks from 'components/Bookmarks/Bookmarks';
import PictureCartel from 'components/PictureCartel/PictureCartel';
import PictureHistorique from 'components/PictureHistorique/PictureHistorique';
import PictureViewer from 'components/PictureViewer/PictureViewer';
import Settings from 'components/Settings/Settings';
import Edit from 'components/Edit/Edit';
import './Content.scss';

interface Props {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    showEdit: boolean;
    closeAll: () => void;
}

interface State {
}

class Content extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        showSettings: false,
        showBookmarks: false,
        showDetails: false,
        showHistory: false,
        showEdit: false,
        closeAll: () => { },
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
            showEdit,
            closeAll
        } = this.props;
        // const { } = this.state;

        const contentClass = classNames('content-wrapper', className)

        return (
            <div className={contentClass}>
                <PictureViewer />

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
                    show={showEdit}
                    onHide={closeAll}>
                    <Edit />
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
        showEdit: state.uiState.showEdit,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    closeAll: () => dispatch(closeAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
