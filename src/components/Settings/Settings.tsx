import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { setTheme, setOpenLink, ThemeType, OpenLinkType } from 'store/ui/ui';
import { setMaxPicturesCount } from 'store/picture/picture';
import './Settings.scss';

interface Props {
    openLink: OpenLinkType;
    theme: ThemeType;
    maxPicturesCount: number;
    setOpenLink: (payload: OpenLinkType) => void;
    setTheme: (payload: ThemeType) => void,
    setMaxPicturesCount: (payload: number) => void,
}

interface State {
}

class Settings extends Component<Props, State> {

    static defaultProps: Props = {
        openLink: OpenLinkType.NEW,
        theme: ThemeType.DARK,
        maxPicturesCount: 100,
        setOpenLink: (payload: OpenLinkType) => {},
        setTheme: (payload: 'dark' | 'light') => {},
        setMaxPicturesCount: (payload: number) => {},
    };

    constructor(props: Props) {
        super(props);

        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleOpenLinkChange = this.handleOpenLinkChange.bind(this);
        this.handleMaxPicturesCountChange = this.handleMaxPicturesCountChange.bind(this);
    }

    handleThemeChange(event: any) {
        const { setTheme } = this.props;
        setTheme(event.target.value);
    }

    handleOpenLinkChange(event: any) {
        const { setOpenLink } = this.props;
        setOpenLink(event.target.value);
    }

    handleMaxPicturesCountChange(event: any) {
        const { setMaxPicturesCount } = this.props;
        setMaxPicturesCount(event.target.value);
    }

    render() {
        const {
            openLink,
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
                                <option value={ThemeType.DARK}>dark</option>
                                <option value={ThemeType.LIGHT}>light</option>
                            </select>
                        </div>

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Open link in </label>
                            <select name="openLink" value={openLink} onChange={this.handleOpenLinkChange}>
                                <option value={OpenLinkType.CURRENT}>current tab</option>
                                <option value={OpenLinkType.NEW}>new tab</option>
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
                    <div className="settings-section-title">Import/Export</div>
                    <div className="settings-section-content">

                        <div className="settings-section-content-row">
                            <button>Import</button>
                        </div>

                        <div className="settings-section-content-row">
                            <button>Export</button>
                        </div>

                    </div>
                </section>

                <section className="settings-section">
                    <div className="settings-section-title">Danger</div>
                    <div className="settings-section-content">

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
    openLink: rootState.uiState.openLink,
    theme: rootState.uiState.theme,
    maxPicturesCount: rootState.pictureState.maxPicturesCount
});

const mapDispatchToProps = (dispatch: any) => ({
    setOpenLink: (payload: OpenLinkType) => dispatch(setOpenLink(payload)),
    setTheme: (payload: ThemeType) => dispatch(setTheme(payload)),
    setMaxPicturesCount: (payload: number) => dispatch(setMaxPicturesCount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
