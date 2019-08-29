import React, { Component, CSSProperties } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import classNames from 'classnames';
import './Modal.scss';
// import Modal, { closeStyle } from 'simple-react-modal';

interface Props {
    children: any;
    show: boolean;
    style: CSSProperties;
    onHide: () => void;
}

export class Modal extends Component<Props> {

    static defaultProps: Props = {
        children: null,
        show: false,
        style: {},
        onHide: () => { },
    };

    state = {
        showModal: false,
        showOverlay: false
    }

    constructor(props: Props) {
        super(props);
        this.onClickContent = this.onClickContent.bind(this);
        this.handleRef = this.handleRef.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.show !== this.props.show) {
            if (nextProps.show) {
                this.setState({ showOverlay: true }, () => {
                    setTimeout(() => {
                        this.setState({ showModal: true });
                    }, 200);
                });

            } else {
                this.setState({ showModal: false }, () => {
                    setTimeout(() => {
                        this.setState({ showOverlay: false });
                    }, 200);
                });
            }
        }
    }

    onClickContent() {
        const { onHide } = this.props;
    }

    handleRef = (ref: any) => {
        console.log('ref')
    }

    /*
    renderOverlay() {
        return();
    }

    renderCloseBtn() {
        return();
    }

    renderContent() {
        return();
    }
    */

    render() {
        let {
            show,
            onHide,
            style,
            children } = this.props;

        const {
            showModal,
            showOverlay } = this.state;

        const modalOverlayClass = classNames('modal-overlay', {
            'modal-overlay-show': showModal,
            'modal-overlay-hide': !showModal,
        });
        const modalContentClass = classNames('modal-content', {
            'modal-content-show': show,
            'modal-content-hide': !show,
        });
        const modalCloseBtnClass = classNames('modal-close-btn', {
            'modal-close-btn-show': showModal,
            'modal-close-btn-hide': !showModal,
        });

        return (
            <>
            { showOverlay &&
            <div onClick={onHide} className={modalOverlayClass}></div>
            }

            <div className={modalContentClass} style={style}>
                <div className="modal-content-inner" onClick={this.onClickContent}>
                    {children}
                </div>
            </div>

            { showOverlay &&
            <button className={modalCloseBtnClass} onClick={onHide}>
            <Icon path={mdiClose} size={1.1} color="white"/>
            </button>
            }
            </>
        );
    }
}
