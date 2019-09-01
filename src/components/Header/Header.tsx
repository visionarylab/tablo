import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiImagePlus, mdiViewGrid, mdiAlertBoxOutline, mdiSettings } from '@mdi/js';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync, toggleShowDetails, toggleShowHistory } from 'store/picture';
import './Header.scss';
import { toggleShowSettings } from 'store/settings';

interface Props {
  className: string;
  getRandomPicture: () => void;
  toggleShowHistory: () => void;
  toggleShowDetails: () => void;
  toggleShowSettings: () => void;
}

class Header extends Component<Props> {

  static defaultProps: Props = {
    className: '',
    getRandomPicture: () => { },
    toggleShowHistory: () => { },
    toggleShowDetails: () => { },
    toggleShowSettings: () => { },
  };

  render() {
    const {
      className,
      getRandomPicture,
      toggleShowHistory,
      toggleShowDetails,
      toggleShowSettings } = this.props;

    const headerClass = classNames('Header-wrapper', className)

    return (
      <div className={headerClass}>

        <div className="Header-controls">
          <button className="Header-btn"
            data-tip="New picture"
            onClick={getRandomPicture}>
            <Icon path={mdiImagePlus} size={1} color="white" />
          </button>
          <button className="Header-btn"
            data-tip="Show history"
            onClick={toggleShowHistory}>
            <Icon path={mdiViewGrid} size={1} color="white" />
          </button>
          <button className="Header-btn"
            data-tip="Show details"
            onClick={toggleShowDetails}>
            <Icon path={mdiAlertBoxOutline} size={1} color="white" />
          </button>
          <button className="Header-btn" onClick={toggleShowSettings}>
          <Icon path={mdiSettings} size={1} color="white" />
          </button>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {}
};

const mapDispatchToProps = (dispatch: any) => ({
  getRandomPicture: () => dispatch(getRandomPictureAsync()),
  toggleShowDetails: () => dispatch(toggleShowDetails()),
  toggleShowHistory: () => dispatch(toggleShowHistory()),
  toggleShowSettings: () => dispatch(toggleShowSettings()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
