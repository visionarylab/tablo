import React, { Component, HTMLAttributes } from 'react';
import styled from 'styled-components'
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { Section, setUserSection, setBrowserSection } from 'store/sidebar/sidebar';
import SidebarSection from 'components/SidebarSection';
import { OpenLinkType } from 'store/ui/ui';

export const SidebarWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

interface Props {
    browserSection: any;
    userSection: any;
    isOnEdit: boolean;
    openLink: OpenLinkType;
    setBrowserSection: (section: Section) => void;
    setUserSection: (section: Section) => void;
}

class Sidebar extends Component<Props & HTMLAttributes<HTMLDivElement>> {
    render() {
        const {
            browserSection,
            setBrowserSection,
            userSection,
            setUserSection,
            isOnEdit } = this.props;

        if (!userSection) {
            return (null);
        }

        return (
            <SidebarWrapper>
                <SidebarSection
                    isOnEdit={isOnEdit}
                    section={browserSection}
                    onSectionChange={setBrowserSection}
                />
                <SidebarSection
                    isOnEdit={isOnEdit}
                    section={userSection}
                    onSectionChange={setUserSection}
                />
            </SidebarWrapper>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        browserSection: state.sidebarState.browserSection,
        userSection: state.sidebarState.userSection,
        isOnEdit: state.sidebarState.isOnEdit,
        openLink: state.uiState.openLink,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    setBrowserSection: (payload: Section) => dispatch(setBrowserSection(payload)),
    setUserSection: (payload: Section) => dispatch(setUserSection({...payload})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
