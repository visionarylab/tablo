import React, { Component, CSSProperties } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import classNames from 'classnames';
import './Modal.scss';

interface Props {
    title?: string;
    children: any;
    show: boolean;
    style: CSSProperties;
    onHide: () => void;
}

class Modal extends Component<Props> {

    ref: HTMLElement | null;

    static defaultProps: Props = {
        title: '',
        children: null,
        show: false,
        style: {},
        onHide: () => { },
    };

    constructor(props: Props) {
        super(props);
        this.ref = null;
        this.handleRef = this.handleRef.bind(this);
        this.onHideSidebar = this.onHideSidebar.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        const { show } = this.props;
        if (this.ref && show && show !== nextProps.show) {
            this.ref.scrollTo(0, 0);
        }
    }

    onHideSidebar() {
        const { onHide } = this.props;
        onHide();
    }

    handleRef = (ref: any) => {
        this.ref = ref;
    }

    render() {
        let {
            title,
            show,
            style,
            children } = this.props;

        const modalContentClass = classNames('modal-content', {
            'modal-content-show': show,
            'modal-content-hide': !show,
        });

        return (
            <div className={modalContentClass} style={{ ...style }}>
                <div className="modal-content-header">
                    <div className="modal-content-title">{title}</div>
                    <button className="modal-close-btn" onClick={this.onHideSidebar}>
                        <Icon path={mdiClose} size={1.1} color="white" />
                    </button>
                </div>

                <div className="modal-content-inner" ref={this.handleRef}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Modal;
