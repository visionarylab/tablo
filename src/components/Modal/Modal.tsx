import React, { Component, CSSProperties } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import classNames from 'classnames';
import './Modal.scss';
// import Modal, { closeStyle } from 'simple-react-modal';

interface Props {
    children: any;
    show: boolean;
    closeOnClickContent: boolean;
    style: CSSProperties;
    onHide: () => void;
}

export class Modal extends Component<Props> {

    static defaultProps: Props = {
        children: null,
        show: false,
        closeOnClickContent: false,
        style: {},
        onHide: () => { },
    };

    constructor(props: Props) {
        super(props);
        this.onClickContent = this.onClickContent.bind(this);
    }

    onClickContent() {
        const { closeOnClickContent, onHide } = this.props;
        if (closeOnClickContent) {
            onHide();
        }
    }

    render() {
        let {
            show,
            onHide,
            style,
            children,
            closeOnClickContent } = this.props;

        const modalClassName = classNames('modal-wrapper', {
            'modal-show': show,
            'modal-hide': !show,
            'closable-content': closeOnClickContent
        });

        return (
            <div className={modalClassName} style={style}>

                <div className="modal-overlay" onClick={onHide}></div>

                <div className="modal-content"
                    onClick={this.onClickContent}>

                    <button className="modal-close-btn"
                        onClick={onHide}>
                        <Icon path={mdiClose} size={1} color="white" />
                    </button>

                    {children}

                </div>
            </div>
        );
    }
}
