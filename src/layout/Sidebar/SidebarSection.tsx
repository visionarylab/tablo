import React, { Component, HTMLAttributes } from 'react';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import './Section.scss';

interface Props {
    title: string;
    toggleEditSection: () => void;
}

interface State {
}

export default class SidebarSection extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const { title, toggleEditSection, children } = this.props;

        return (
            <div className="section-wrapper">
                <div className="section-header">
                    <div className="section-header-title">{title}</div>

                    <div className="flex-separator"></div>

                    <div className="section-header-btn" onClick={toggleEditSection}>
                        <Icon path={mdIcon['mdiPencil']} size="var(--iconSize)" color="var(--color)" />
                    </div>
                </div>

                <div className="section-content">
                    {children}
                </div>

            </div>
        );
    }
}
