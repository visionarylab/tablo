import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { SidebarSectionItem } from 'store/Sidebar';
import './Sidebar.scss';

interface Props {
    browserSection: SidebarSectionItem | null,
}

interface State {
}

class SidebarLeft extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        browserSection: null,
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const { className, browserSection } = this.props;

        if (!browserSection) {
            return (null);
        }

        const sidebarClass = classNames('sidebar-wrapper', className);

        return (
            <Sidebar className={sidebarClass}>
                <SidebarSection
                    section={browserSection}
                    iconType="icon"
                    onItemsChange={(items: any[]) => {}}
                />
            </Sidebar>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        browserSection: state.sidebarState.browserSection,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);
