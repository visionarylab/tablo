import React, { Component } from 'react';
import './Header.scss';
import SearchBar from 'components/SearchBar/SearchBar';

export class Header extends Component {
    render() {
      return (
        <div className="header-wrapper">
          <SearchBar/>
        </div>
      );
    }
}
