import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { toggleShowSettings } from 'store/settings';
import { Modal } from 'components/Modal/Modal';
import './Settings.scss';

interface Props {
    showSettings: boolean;
    toggleShowSettings: () => void;
}

export class Settings extends Component<Props> {

    static defaultProps: Props = {
        showSettings: false,
        toggleShowSettings: () => {},
    };

    render() {
        const { showSettings, toggleShowSettings } = this.props;

        return (
        <Modal
            title="Settings"
            show={showSettings}
            onHide={toggleShowSettings}>
        </Modal>
        );
    }
}

const mapStateToProps = (rootState: RootState) => ({
    showSettings: rootState.settingsState.showSettings,
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleShowSettings: () => dispatch(toggleShowSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


