import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiImagePlus,
    mdiViewGrid,
    mdiAlertBoxOutline,
    mdiSettings,
    mdiBookmarkOutline} from '@mdi/js';
import {
    openSettingsSidebar,
    openHistorySidebar,
    openDetailsSidebar,
    openBookmarksSidebar,
    closeAllSidebarSidebar} from 'store/ui';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync } from 'store/picture';

import './Header.scss';

interface Props {
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

class Header extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
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

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyboard.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyboard.bind(this), false);
    }

    handleKeyboard(event: any) {
        console.log('event', event);

        if (event.keyCode === 27) {
            this.props.closeAllSidebarSidebar();
            this.setState({ searchQuery: '' })
        }

        if (event.key.length == 1) {
            const newQuery = this.state.searchQuery + event.key + '';
            this.setState({ searchQuery: newQuery.trim() })
        }

        if (event.keyCode == 8 && this.state.searchQuery.length > 0) {
            const newQuery = this.state.searchQuery.slice(0, -1);
            this.setState({ searchQuery: newQuery.trim()})
            console.log('backspace')
        }

        console.log(this.state.searchQuery)
    }

    handleQueryChange(event: any) {
        this.setState({ searchQuery: event.target.value })
    }

    render() {
        const {
            className,
            getRandomPicture,
            openSettingsSidebar,
            openBookmarksSidebar,
            openDetailsSidebar,
            openHistorySidebar } = this.props;

        const headerClass = classNames('header-wrapper', className)

        return (
            <div className={headerClass}>

                {this.state.searchQuery &&
                    <div className="texttt">{this.state.searchQuery}</div>
                }

                <div className="header-controls">

                    <input className="header-search" type="text" name="" id=""
                        value={this.state.searchQuery}
                        onChange={this.handleQueryChange}
                    />

                    <button className="header-btn"
                        data-tip="Bookmarks"
                        onClick={openBookmarksSidebar}>
                        <Icon path={mdiBookmarkOutline} size={1} />
                    </button>

                    <div className="separator"></div>

                    <button className="header-btn"
                        data-tip="New picture"
                        onClick={getRandomPicture}>
                        <Icon path={mdiImagePlus} size={1} />
                    </button>

                    <button className="header-btn"
                        data-tip="Show history"
                        onClick={openHistorySidebar}>
                        <Icon path={mdiViewGrid} size={1} />
                    </button>

                    <button className="header-btn"
                        data-tip="Show details"
                        onClick={openDetailsSidebar}>
                        <Icon path={mdiAlertBoxOutline} size={1} />
                    </button>

                    <div className="separator"></div>

                    <button className="header-btn"
                        onClick={openSettingsSidebar}>
                        <Icon path={mdiSettings} size={1} />
                    </button>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
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
