import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { Section, setBrowserSection } from 'store/sidebar/sidebar';
import SidebarSection from 'components/SidebarSection';
import { OpenLinkType } from 'store/ui/ui';

interface Props {
    section: any;
    isOnEdit: boolean;
    openLink: OpenLinkType;
    setBrowserSection: (section: Section) => void;
}

class SidebarLeft extends Component<Props & HTMLAttributes<HTMLDivElement>> {
    render() {
        const { section, setBrowserSection, className, isOnEdit  } = this.props;
        const classnames = classNames('sidebar-wrapper', className);

        if (!section) {
            return (null);
        }

        return (
            <div className={classnames}>
                <SidebarSection
                    isOnEdit={isOnEdit}
                    section={section}
                    onSectionChange={setBrowserSection}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        section: state.sidebarState.browserSection,
        isOnEdit: state.sidebarState.isOnEdit,
        openLink: state.uiState.openLink,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    setBrowserSection: (payload: Section) => dispatch(setBrowserSection(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);
