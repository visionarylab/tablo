import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import './Header.scss';

interface Props {
}

interface State {
}

class Header extends Component<Props, State> {

  static defaultProps: Props = {
  };

  constructor(props: any) {
    super(props);
  }


  render() {
    const { } = this.props;
    const { } = this.state;

    return (
      <div className="header-wrapper">

      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
  }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
