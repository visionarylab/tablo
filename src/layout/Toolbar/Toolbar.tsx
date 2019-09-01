import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiImagePlus, mdiViewGrid, mdiAlertBoxOutline, mdiSettings } from '@mdi/js';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync, toggleShowDetails, toggleShowHistory } from 'store/picture';
import './Toolbar.scss';

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

  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      className,
      getRandomPicture,
      toggleShowHistory,
      toggleShowDetails,
      toggleShowSettings } = this.props;

    const toolbarClass = classNames('toolbar-wrapper', className)

    return (
      <div className={toolbarClass}>

        <div className="toolbar-controls">
          <button className="toolbar-btn"
            data-tip="New picture"
            onClick={getRandomPicture}>
            <Icon path={mdiImagePlus} size={1} color="white" />
          </button>
          <button className="toolbar-btn"
            data-tip="Show history"
            onClick={toggleShowHistory}>
            <Icon path={mdiViewGrid} size={1} color="white" />
          </button>
          <button className="toolbar-btn"
            data-tip="Show details"
            onClick={toggleShowDetails}>
            <Icon path={mdiAlertBoxOutline} size={1} color="white" />
          </button>
          <button className="toolbar-btn" onClick={toggleShowSettings}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);