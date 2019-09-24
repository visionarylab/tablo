import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { Section, setUserSection } from 'store/Sidebar';
import SidebarSection from 'components/SidebarSection/SidebarSection';

interface Props {
    section: any;
    onSectionChange: (section: Section) => void;
}

class SidebarLeft extends Component<Props & HTMLAttributes<HTMLDivElement>> {
    render() {
        const { section, onSectionChange, className } = this.props;
        const classnames = classNames('sidebar-wrapper', className);

        if (!section) {
            return (null);
        }

        return (
            <div className={classnames}>
                <SidebarSection
                    section={section}
                    onSectionChange={onSectionChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        section: state.sidebarState.userSection,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onSectionChange: (payload: Section) => dispatch(setUserSection({...payload}))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);
