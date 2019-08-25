import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import './Dialog.scss';

interface Props {
    children: any;
    visible: boolean;
    closeOnClickContent: boolean;
    style: CSSProperties;
    bgColor: string;
    onHide: () => void;
}

export class Dialog extends Component<Props> {

    static defaultProps: Props = {
        children: null,
        visible: false,
        closeOnClickContent: false,
        style: {},
        bgColor: '#282c34',
        onHide: () => {},
    };

    constructor(props: Props) {
        super(props);
        this.onClickContent = this.onClickContent.bind(this);
    }

    onClickContent() {
        const { closeOnClickContent, onHide } = this.props;
        if (closeOnClickContent) {
            onHide();
        }
    }

    render() {
        let {
            children,
            visible,
            closeOnClickContent,
            style,
            bgColor,
            onHide } = this.props;

        const dialogClassName = classNames('dialog-wrapper', {
            'dialog-show': visible,
            'dialog-hide': !visible,
            'closable-content': closeOnClickContent
        });

        return (
        <div className={dialogClassName} style={style}>
            <div className="dialog-overlay" onClick={onHide}></div>
            <div className="dialog-content"
                style={{ backgroundColor: bgColor}}
                onClick={this.onClickContent}>
                {children}
            </div>
        </div>
        );
    }
}
