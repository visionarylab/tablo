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
            <div className="settings-wrapper"></div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => ({});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


