import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface ButtonProps {
  isIcon?: boolean;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  onBlur?: () => void;
  className?: string;
  styles?: CSSProperties;
}

export default class Button extends Component<ButtonProps> {
  render() {
    let { isIcon, children, onClick, onBlur, className, styles } = this.props;

    // if ( === '')
    let buttonClass = classNames(className,'button', {
      'icon-button': isIcon,
      'text-button': !isIcon
    });

    return (
      <button
        style={styles}
        className={buttonClass}
        onClick={onClick}
        onBlur={onBlur}>

        {children}

      </button>
    );
  }
}
