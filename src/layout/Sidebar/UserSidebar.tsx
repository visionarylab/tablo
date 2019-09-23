import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { UserSectionType, UserItemType } from 'store/Sidebar';
import SidebarSection from './SidebarSection';
import UserItem from './UserItem';
import './Item.scss';


interface Props {
    userSection: UserSectionType;
}

interface State {
    isOnEdit: boolean;
}

class UserSidebar extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

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

    editItem(item: UserItemType, index: number) {

    }

    deleteItem(item: UserItemType, index: number) {

    }

    toggleItemVisibility(item: UserItemType, index: number) {

    }


    render() {
        const { userSection, className  } = this.props;
        const { isOnEdit  } = this.state;

        if (!userSection) {
            return (null);
        }

        const classnames = classNames('sidebar-wrapper', className);

        return (
            <div className={classnames}>
                <SidebarSection
                    title={userSection.title}
                    toggleEditSection={this.toggleEditSection}>

                    {userSection.items.map((item: UserItemType, index: number) => (
                        <UserItem key={index}
                            item={item}
                            isOnEdit={isOnEdit}
                            editItem={() => this.editItem(item, index)}
                            deleteItem={() => this.deleteItem(item, index)}
                        />
                    ))}

                </SidebarSection>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSidebar);


