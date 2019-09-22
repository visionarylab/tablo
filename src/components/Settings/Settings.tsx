import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import './Settings.scss';

interface Props {
}

interface State {
}

export class Settings extends Component<Props, State> {
    static defaultProps: Props = {};
    render() {
        return (
            <div className="settings-wrapper">

                <section className="settings-section">
                    <div className="settings-section-title">General</div>
                    <div className="settings-section-content">

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Theme</label>
                            <select name="theme">
                                <option value="dark">dark</option>
                                <option value="dark">light</option>
                            </select>
                        </div>

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Open link in </label>
                            <select name="theme">
                                <option value="dark">current tab</option>
                                <option value="dark">new tab</option>
                            </select>
                        </div>

                        <div className="settings-section-content-row">
                            <label htmlFor="theme">Nbr of history</label>
                            <input type="number" name="" id=""/>
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

const mapStateToProps = (rootState: RootState) => ({});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


