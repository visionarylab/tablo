import React, { Component, CSSProperties } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { Toolbar, IconButton, Text, FlexSeparator, ModalContainer, ModalInner } from 'components/ui';

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
            children } = this.props;

        const translate = show ? 'translateY(0)' : 'translateY(100%)';

        return (
            <ModalContainer style={{ transform: translate }}>
                <Toolbar>
                    <Text fontSize="1.5">{title}</Text>
                    <FlexSeparator/>
                    <IconButton onClick={this.onHideSidebar}>
                        <Icon path={mdiClose} size="var(--iconSizeBtn)" color="var(--color)" />
                    </IconButton>
                </Toolbar>

                <ModalInner className="modal-content-inner" ref={this.handleRef}>
                    {children}
                </ModalInner>
            </ModalContainer>
        );
    }
}

export default Modal;
