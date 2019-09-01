import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Icon from '@mdi/react';
import {
    mdiImagePlus,
    mdiViewGrid,
    mdiAlertBoxOutline,
    mdiSettings,
    mdiBookmarkOutline } from '@mdi/js';
import {
    openSettingsSidebar,
    closeAllSidebarSidebar,
    openHistorySidebar,
    openDetailsSidebar,
    openBookmarksSidebar } from 'store/ui';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync } from 'store/picture';
import PictureHistorique from 'components/PictureHistorique/PictureHistorique';
import PictureCartel from 'components/PictureCartel/PictureCartel';
import Sidebar from 'components/Sidebar/Sidebar';
import Bookmarks from 'components/Bookmarks/Bookmarks';

import './Header.scss';

interface Props {
    className: string;
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    getRandomPicture: () => void;
    openSettingsSidebar: () => void;
    openBookmarksSidebar: () => void;
    openDetailsSidebar: () => void;
    openHistorySidebar: () => void;
    closeAllSidebarSidebar: () => void;
}

interface State {
    searchQuery: string;
}

class Header extends Component<Props, State> {

    static defaultProps: Props = {
        className: '',
        showSettings: false,
        showBookmarks: false,
        showDetails: false,
        showHistory: false,
        getRandomPicture: () => { },
        openSettingsSidebar: () => { },
        openBookmarksSidebar: () => { },
        openDetailsSidebar: () => { },
        openHistorySidebar: () => { },
        closeAllSidebarSidebar: () => { },
    };


    constructor(props: any) {
        super(props);

        this.state = {
            searchQuery: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({ searchQuery: event.target.value })
    }

    render() {
        const {
            className,
            showSettings,
            showBookmarks,
            showDetails,
            showHistory,
            getRandomPicture,
            openSettingsSidebar,
            openBookmarksSidebar,
            openDetailsSidebar,
            openHistorySidebar,
            closeAllSidebarSidebar } = this.props;

        const headerClass = classNames('Header-wrapper', className)

        return (
            <div className={headerClass}>

                {this.state.searchQuery &&
                    <div className="texttt">{this.state.searchQuery}</div>
                }

                <input type="text" name="" id=""
                    value={this.state.searchQuery}
                    onChange={this.handleChange}
                />

                <div className="Header-controls">

                    <button className="Header-btn"
                        data-tip="Bookmarks"
                        onClick={openBookmarksSidebar}>
                        <Icon path={mdiBookmarkOutline} size={1} color="white" />
                    </button>

                    <button className="Header-btn"
                        data-tip="New picture"
                        onClick={getRandomPicture}>
                        <Icon path={mdiImagePlus} size={1} color="white" />
                    </button>

                    <button className="Header-btn"
                        data-tip="Show history"
                        onClick={openHistorySidebar}>
                        <Icon path={mdiViewGrid} size={1} color="white" />
                    </button>

                    <button className="Header-btn"
                        data-tip="Show details"
                        onClick={openDetailsSidebar}>
                        <Icon path={mdiAlertBoxOutline} size={1} color="white" />
                    </button>

                    <button className="Header-btn" onClick={openSettingsSidebar}>
                        <Icon path={mdiSettings} size={1} color="white" />
                    </button>

                </div>

                <Sidebar
                    title="Settings"
                    show={showSettings}
                    onHide={closeAllSidebarSidebar}>
                    Settings
                </Sidebar>

                <Sidebar
                    title="Bookmarks"
                    show={showBookmarks}
                    onHide={closeAllSidebarSidebar}>
                    <Bookmarks />
                </Sidebar>

                <Sidebar
                    title="Details"
                    show={showDetails}
                    onHide={closeAllSidebarSidebar}>
                    <PictureCartel />
                </Sidebar>

                <Sidebar
                    title="History"
                    show={showHistory}
                    onHide={closeAllSidebarSidebar}>
                    <PictureHistorique />
                </Sidebar>

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
    getRandomPicture: () => dispatch(getRandomPictureAsync()),
    openSettingsSidebar: () => dispatch(openSettingsSidebar()),
    openBookmarksSidebar: () => dispatch(openBookmarksSidebar()),
    openDetailsSidebar: () => dispatch(openDetailsSidebar()),
    openHistorySidebar: () => dispatch(openHistorySidebar()),
    closeAllSidebarSidebar: () => dispatch(closeAllSidebarSidebar()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
