import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './Sidebar.scss';

interface Props {
}

interface State {
}

export default class SidebarRight extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const { className, children } = this.props;

        const sidebarClass = classNames('sidebar-wrapper', className)
        return (
            <div className={sidebarClass}>
                <div className="sidebar-wrapper-inner">
                {children}
                </div>
            </div>
        );
    }
}
