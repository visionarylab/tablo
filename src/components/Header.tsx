import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiImagePlus,
    mdiViewGrid,
    mdiAlertBoxOutline,
    mdiSettings,
    mdiPlus,
    mdiPencil,
    mdiPencilOff} from '@mdi/js';
import {
    toggleSettings,
    toggleHistory,
    toggleDetails,
    toggleBookmarks,
    closeAll,
    toggleAddSectionItem} from 'store/ui/ui';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync } from 'store/picture/picture';
import { Toolbar, ToolbarSeparator, IconButton, FlexSeparator } from 'components/ui';
import { toggleIsOnEdit } from 'store/sidebar/sidebar';

interface Props {
    isOnEdit: boolean;
    getRandomPicture: () => void;
    toggleSettings: () => void;
    toggleBookmarks: () => void;
    toggleDetails: () => void;
    toggleHistory: () => void;
    toggleAddSectionItem: () => void;
    closeAll: () => void;
    toggleIsOnEdit: () => void;
}

interface State {
    searchQuery: string;
}

class Header extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        isOnEdit: false,
        getRandomPicture: () => { },
        toggleSettings: () => { },
        toggleBookmarks: () => { },
        toggleDetails: () => { },
        toggleHistory: () => { },
        toggleAddSectionItem: () => { },
        closeAll: () => { },
        toggleIsOnEdit: () => { },
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
        // console.log('event', event);

        if (event.keyCode === 27) {
            this.props.closeAll();
            this.setState({ searchQuery: '' })
        }

        if (event.key.length === 1) {
            // const newQuery = this.state.searchQuery + event.key + '';
            // this.setState({ searchQuery: newQuery.trim() })
        }

        if (event.keyCode === 8 && this.state.searchQuery.length > 0) {
            // const newQuery = this.state.searchQuery.slice(0, -1);
            // this.setState({ searchQuery: newQuery.trim()})
            // console.log('backspace');
        }
        // console.log(this.state.searchQuery)
    }

    handleQueryChange(event: any) {
        this.setState({ searchQuery: event.target.value })
    }

    render() {
        const {
            isOnEdit,
            className,
            getRandomPicture,
            toggleSettings,
            // toggleBookmarks,
            toggleDetails,
            toggleHistory,
            toggleAddSectionItem,
            toggleIsOnEdit } = this.props;

        return (
            <Toolbar className={className}>

                {/*
                {this.state.searchQuery &&
                    <div className="texttt">{this.state.searchQuery}</div>
                }
                <Input value={this.state.searchQuery} onChange={this.handleQueryChange} />


                <IconButton onClick={toggleBookmarks}>
                    <Icon path={mdiBookmarkOutline} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <ToolbarSeparator/>
                */}


                <IconButton onClick={toggleAddSectionItem}>
                    <Icon path={mdiPlus} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <IconButton onClick={toggleIsOnEdit}>
                    <Icon path={isOnEdit ? mdiPencilOff : mdiPencil} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <FlexSeparator/>

                <IconButton onClick={getRandomPicture}>
                    <Icon path={mdiImagePlus} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <IconButton onClick={toggleHistory}>
                    <Icon path={mdiViewGrid} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <IconButton onClick={toggleDetails}>
                    <Icon path={mdiAlertBoxOutline} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

                <ToolbarSeparator/>

                <IconButton onClick={toggleSettings}>
                    <Icon path={mdiSettings} size="var(--iconSizeBtn)" color="var(--color)"/>
                </IconButton>

            </Toolbar>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isOnEdit: state.sidebarState.isOnEdit
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    getRandomPicture: () => dispatch(getRandomPictureAsync()),
    toggleSettings: () => dispatch(toggleSettings()),
    toggleBookmarks: () => dispatch(toggleBookmarks()),
    toggleDetails: () => dispatch(toggleDetails()),
    toggleHistory: () => dispatch(toggleHistory()),
    toggleAddSectionItem: () => dispatch(toggleAddSectionItem()),
    closeAll: () => dispatch(closeAll()),
    toggleIsOnEdit: () => dispatch(toggleIsOnEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
