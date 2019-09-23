import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import './Sidebar.scss';
import BrowserApi from 'api/BrowserApi';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove } from 'react-sortable-hoc';


const Handle = SortableHandle(({ className }) => (
    <div className="grid-item-handle">
        <Icon path={mdIcon.mdiMenu} size={1} color="white" />
    </div>
));

const ListItem = SortableElement(({ item, index, isOnEdit, openLink }) => {
    return (
        <button className="sidebar-content-item" onClick={(e) => {openLink(item.link)}}>
            {isOnEdit && <Handle />}

            <div className="sidebar-content-item-icon">
                {item.icon
                    ? <Icon path={mdIcon[item.icon]} size="var(--iconSize)" color="var(--color)"/>
                    : <FaviconWrapper url={item.link}/>}
            </div>
            <span className="sidebar-content-item-label">{item.label}</span>

            {isOnEdit &&
                <>
                <Icon path={mdIcon.mdiEyeOffOutline} size="var(--iconSize)" color="var(--color)"/>
                <Icon path={mdIcon.mdiEyeOutline} size="var(--iconSize)" color="var(--color)"/>
                </>
            }

        </button>
    );
});

const List = SortableContainer(({ children }) => (
    <div className="sidebar-content">
        {children}
    </div>
));


interface Props {
    section: SidebarSectionItem | null;
    iconType: 'icon' | 'img';
    onItemsChange: (items: SidebarItem[]) => void;
}

interface State {
    isOnEdit: boolean;
}

class SidebarSection extends Component<Props, State> {

    static defaultProps: Props = {
        section: null,
        iconType: 'img',
        onItemsChange: (items: SidebarItem[]) => { },
    };

    constructor(props: any) {
        super(props);

        this.state = {
            isOnEdit: false,
        }

        this.toggleIsOnEdit = this.toggleIsOnEdit.bind(this);
        this.onSortStart = this.onSortStart.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.openLink = this.openLink.bind(this);
    }

    toggleIsOnEdit(event: any) {
        this.setState({ isOnEdit: !this.state.isOnEdit });
    }

    onSortStart(event: any) {
        document.body.style.cursor = 'grabbing';
    }

    onSortEnd({ oldIndex, newIndex }) {
        const { section } = this.props;
        document.body.style.cursor = 'default';
        if (section) {
            section.items = arrayMove(section.items, oldIndex, newIndex);
        }
        // this.setState({ section });
    }

    openLink(url: string) {
        const { section } = this.props;
        if (section) {
            if (!section.openInCurrentTab) {
                BrowserApi.openUrlInCurrentTab(url)
            } else {
                BrowserApi.openUrlInNewTab(url)
            }
        }
    }

    render() {
        //const { } = this.props;
        const { section,
            // onItemsChange
        } = this.props;
        const { isOnEdit } = this.state;

        if (!section) {
            return (null);
        }

        const iconSizeHeader = '15px';
        const iconSize = '20px';

        return (
            <div className="sidebar-section">
                <div className="sidebar-header">
                    <div className="sidebar-header-title">{section.title}</div>

                    <div className="flex-separator"></div>

                    <div className="sidebar-header-btn sidebar-btn" onClick={this.toggleIsOnEdit}>
                        <Icon path={mdIcon['mdiPlus']} size="var(--iconSize)" color="var(--color)" />
                    </div>

                    <div className="sidebar-header-btn sidebar-btn" onClick={this.toggleIsOnEdit}>
                        <Icon path={mdIcon['mdiPencil']} size="var(--iconSize)" color="var(--color)" />
                    </div>
                </div>

                <div className="sidebar-content">


                    {section.items.map((item: SidebarItem, index: number) => {
                        return (
                            <ListItem key={index}
                                index={index}
                                item={item}
                                isOnEdit={isOnEdit}
                                openLink={this.openLink}
                            />
                            );
                        })}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSection);






