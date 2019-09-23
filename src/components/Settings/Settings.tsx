import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import './Settings.scss';
import { setTheme } from 'store/ui';
import { setOpenInCurrentTab } from 'store/Sidebar';
import { setMaxPicturesCount } from 'store/picture';

interface Props {
    openInCurrentTab: boolean;
    theme: 'dark' | 'light';
    maxPicturesCount: number;
    setOpenInCurrentTab: (payload: boolean) => void;
    setTheme: (payload: 'dark' | 'light') => void,
    setMaxPicturesCount: (payload: number) => void,
}

interface State {
}

class Settings extends Component<Props, State> {

    static defaultProps: Props = {
        openInCurrentTab: false,
        theme: 'dark',
        maxPicturesCount: 100,
        setOpenInCurrentTab: (payload: boolean) => {},
        setTheme: (payload: 'dark' | 'light') => {},
        setMaxPicturesCount: (payload: number) => {},
    };

    constructor(props: Props) {
        super(props);

        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleOpenInCurrentTabChange = this.handleOpenInCurrentTabChange.bind(this);
        this.handleMaxPicturesCountChange = this.handleMaxPicturesCountChange.bind(this);
    }

    handleThemeChange(event: any) {
        const { setTheme } = this.props;
        setTheme(event.target.value);
    }

    handleOpenInCurrentTabChange(event: any) {
        const { setOpenInCurrentTab } = this.props;
        setOpenInCurrentTab(event.target.value);
    }

    handleMaxPicturesCountChange(event: any) {
        const { setMaxPicturesCount } = this.props;
        setMaxPicturesCount(event.target.value);
    }

    render() {
        const {
            openInCurrentTab,
            theme,
            maxPicturesCount } = this.props;

        return (
            <div className="settings-wrapper">

                <section className="settings-section">
                    <div className="settings-section-title">General</div>
                    <div className="settings-section-content">

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Theme</label>
                            <select name="theme" value={theme} onChange={this.handleThemeChange}>
                                <option value="dark">dark</option>
                                <option value="dark">light</option>
                            </select>
                        </div>

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Open link in </label>
                            <select name="openLink" value={openInCurrentTab.toString()} onChange={this.handleOpenInCurrentTabChange}>
                                <option value="true">current tab</option>
                                <option value="false">new tab</option>
                            </select>
                        </div>

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Nbr of history</label>
                            <input type="number" name="maxPicturesCount"
                                value={maxPicturesCount}
                                onChange={this.handleMaxPicturesCountChange}/>
                        </div>

                    </div>
                </section>

                <section className="settings-section">
                    <div className="settings-section-title">Danger</div>
                    <div className="settings-section-content">

                        <div className="settings-section-content-row">
                            <button>Import</button>
                        </div>

                        <div className="settings-section-content-row">
                            <button>Export</button>
                        </div>

                        <div className="settings-section-content-row">
                            <button>Reset</button>
                        </div>

                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => ({
    openInCurrentTab: rootState.sidebarState.openInCurrentTab,
    theme: rootState.uiState.theme,
    maxPicturesCount: rootState.pictureState.maxPicturesCount
});

const mapDispatchToProps = (dispatch: any) => ({
    setOpenInCurrentTab: (payload: boolean) => dispatch(setOpenInCurrentTab(payload)),
    setTheme: (payload: 'dark' | 'light') => dispatch(setTheme(payload)),
    setMaxPicturesCount: (payload: number) => dispatch(setMaxPicturesCount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
