import React, { Component, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import classNames from 'classnames';
import './Sidebar.scss';

interface Props {
    title?: string;
    children: any;
    show: boolean;
    style: CSSProperties;
    onHide: () => void;
}

export default class Sidebar extends Component<Props> {

    // rootEl = document.getElementById('root');
    rootEl = document.body;

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

    componentDidMount() {
        document.addEventListener('keydown', this.onEscape.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape.bind(this), false);
    }

    componentWillReceiveProps(nextProps: Props) {
        const { show } = this.props;
        if (this.ref && show && show !== nextProps.show) {
            this.ref.scrollTo(0, 0);
        }

        if (nextProps.show && this.rootEl) {
            this.rootEl.classList.add('show-sidebar');
        }
    }

    onHideSidebar() {
        const { onHide } = this.props;
        if (this.rootEl) {
            this.rootEl.classList.remove('show-sidebar');
        }
        onHide();
    }

    onEscape(event: any) {
        const { show } = this.props;
        if (event.keyCode === 27 && show) {
            this.props.onHide();
        }
    }

    handleRef = (ref: any) => {
        this.ref = ref;
    }

    toggleRootClass() {
        if (this.rootEl) {
            if (this.props.show) {
                this.rootEl.classList.add('show-sidebar');
            } else {
                this.rootEl.classList.remove('show-sidebar');
            }
        }
    }

    render() {
        let {
            title,
            show,
            style,
            children } = this.props;

        if (!this.rootEl) {
            return (null);
        }

        const sidebarOverlayClass = classNames('sidebar-overlay', {
            'sidebar-overlay-show': show,
            'sidebar-overlay-hide': !show,
        });

        const sidebarContentClass = classNames('sidebar-content', {
            'sidebar-content-show': show,
            'sidebar-content-hide': !show,
        });

        return ReactDOM.createPortal(
            <>
                {show &&
                    <div onClick={this.onHideSidebar} className={sidebarOverlayClass}></div>
                }

                <div className={sidebarContentClass} style={{ ...style }}>
                    <div className="sidebar-content-header">
                        <div className="sidebar-content-title">{title}</div>
                        <button className="sidebar-close-btn" onClick={this.onHideSidebar}>
                            <Icon path={mdiClose} size={1.1} color="white" />
                        </button>
                    </div>

                    <div className="sidebar-content-inner" ref={this.handleRef}>
                        {children}
                    </div>
                </div>
            </>,
            this.rootEl
        );
    }
}
