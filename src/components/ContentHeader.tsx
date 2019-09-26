import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiImagePlus,
    mdiViewGrid,
    mdiAlertBoxOutline,
    mdiSettings,
    mdiBookmarkOutline,
    mdiPlus} from '@mdi/js';
import {
    toggleSettings,
    toggleHistory,
    toggleDetails,
    toggleBookmarks,
    closeAll,
    toggleEdit} from 'store/ui/ui';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync } from 'store/picture/picture';
import { Toolbar, Input, ToolbarSeparator, IconButton, FlexSeparator } from 'components/ui';

interface Props {
    getRandomPicture: () => void;
    toggleSettings: () => void;
    toggleBookmarks: () => void;
    toggleDetails: () => void;
    toggleHistory: () => void;
    toggleEdit: () => void;
    closeAll: () => void;
}

interface State {
    searchQuery: string;
}

class ContentHeader extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        getRandomPicture: () => { },
        toggleSettings: () => { },
        toggleBookmarks: () => { },
        toggleDetails: () => { },
        toggleHistory: () => { },
        toggleEdit: () => { },
        closeAll: () => { },
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
            const newQuery = this.state.searchQuery + event.key + '';
            // this.setState({ searchQuery: newQuery.trim() })
        }

        if (event.keyCode === 8 && this.state.searchQuery.length > 0) {
            const newQuery = this.state.searchQuery.slice(0, -1);
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
            className,
            getRandomPicture,
            toggleSettings,
            toggleBookmarks,
            toggleDetails,
            toggleHistory,
            toggleEdit } = this.props;

        return (
            <Toolbar className={className}>

                {false  && this.state.searchQuery &&
                    <div className="texttt">{this.state.searchQuery}</div>
                }

                <Input value={this.state.searchQuery} onChange={this.handleQueryChange} />

                <IconButton onClick={toggleBookmarks}>
                    <Icon path={mdiBookmarkOutline} size="var(--iconSizeBtn)" color="var(--color)"/>
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

                <IconButton onClick={toggleEdit}>
                    <Icon path={mdiPlus} size="var(--iconSizeBtn)" color="var(--color)"/>
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
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    getRandomPicture: () => dispatch(getRandomPictureAsync()),
    toggleSettings: () => dispatch(toggleSettings()),
    toggleBookmarks: () => dispatch(toggleBookmarks()),
    toggleDetails: () => dispatch(toggleDetails()),
    toggleHistory: () => dispatch(toggleHistory()),
    toggleEdit: () => dispatch(toggleEdit()),
    closeAll: () => dispatch(closeAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
