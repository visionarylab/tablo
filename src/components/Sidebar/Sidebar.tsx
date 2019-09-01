import React, { Component, CSSProperties } from 'react';
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

export class Sidebar extends Component<Props> {

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
    }

    onEscape(event: any) {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.onHide();
        }
    }

    handleRef = (ref: any) => {
        this.ref = ref;
    }

    render() {
        let {
            title,

            show,
            onHide,
            style,
            children } = this.props;

        const sidebarOverlayClass = classNames('sidebar-overlay', {
            'sidebar-overlay-show': show,
            'sidebar-overlay-hide': !show,
        });

        const sidebarContentClass = classNames('sidebar-content', {
            'sidebar-content-show': show,
            'sidebar-content-hide': !show,
        });

        return (
        <>
            {show &&
                <div onClick={onHide} className={sidebarOverlayClass}></div>
            }

            <div className={sidebarContentClass} style={{...style, width: '400px'}}>
                <div className="sidebar-content-header">
                    <div className="sidebar-content-title">{title}</div>
                    <button className="sidebar-close-btn" onClick={onHide}>
                        <Icon path={mdiClose} size={1.1} color="white" />
                    </button>
                </div>

                <div className="sidebar-content-inner" ref={this.handleRef}>
                    {children}
                </div>
            </div>
        </>
        );
    }
}
