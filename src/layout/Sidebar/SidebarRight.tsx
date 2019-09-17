import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';
import { SITE_ITEMS } from './SidebarData';
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
        const { className } = this.props;

        const sidebarClass = classNames('sidebar-wrapper', className)
        return (
            <Sidebar className={sidebarClass}>
                <SidebarSection
                    title="Site"
                    iconType="img"
                    items={SITE_ITEMS}
                    onItemsChange={(items: any[]) => {}}
                />
            </Sidebar>
        );
    }
}
