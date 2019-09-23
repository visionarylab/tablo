import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { SidebarSectionItem } from 'store/Sidebar';
import './Sidebar.scss';

interface Props {
    userSection: SidebarSectionItem | null,
}

interface State {
}

class SidebarRight extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps: Props = {
        userSection: null
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const { className, userSection } = this.props;

        if (!userSection) {
            return (null);
        }

        const sidebarClass = classNames('sidebar-wrapper', className);

        return (
            <Sidebar className={sidebarClass}>
                <SidebarSection
                    section={userSection}
                    iconType="img"
                    onItemsChange={(items: any[]) => {}}
                />
            </Sidebar>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        userSection: state.sidebarState.userSection,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);

