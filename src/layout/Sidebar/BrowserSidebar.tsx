import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import BrowserItem from './BrowserItem';
import SidebarSection from './SidebarSection';
import { BrowserItemType, BrowserSectionType } from 'store/Sidebar';
import './Item.scss';


interface Props {
    browserSection: BrowserSectionType;
}

interface State {
    isOnEdit: boolean;
}

class BrowserSidebar extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            isOnEdit: false,
        };

        this.toggleEditSection = this.toggleEditSection.bind(this);
        this.editItem = this.editItem.bind(this);
        this.toggleItemVisibility = this.toggleItemVisibility.bind(this);
    }

    toggleEditSection() {
        this.setState({ isOnEdit: !this.state.isOnEdit });
    }

    editItem(item: BrowserItemType, index: number) {

    }

    toggleItemVisibility(item: BrowserItemType, index: number) {

    }


    render() {
        const { browserSection, className  } = this.props;
        const { isOnEdit  } = this.state;

        if (!browserSection) {
            return (null);
        }

        const classnames = classNames('sidebar-wrapper', className);

        return (
            <div className={classnames}>
                <SidebarSection
                    title={browserSection.title}
                    toggleEditSection={this.toggleEditSection}>

                    {browserSection.items.map((item: BrowserItemType, index: number) => (
                        <BrowserItem key={index}
                            item={item}
                            isOnEdit={isOnEdit}
                            editItem={() => this.toggleItemVisibility(item, index)}
                            toggleItemVisibility={() => this.toggleItemVisibility(item, index)}
                        />
                    ))}

                </SidebarSection>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrowserSidebar);


