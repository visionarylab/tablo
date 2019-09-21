import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import './Sidebar.scss';
import { SidebarSectionItem, SidebarItem } from 'store/Sidebar';
import BrowserApi from 'api/BrowserApi';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';


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
        document.body.style.cursor = 'default';
        this.setState({
            // items: arrayMove(this.state.items, oldIndex, newIndex),
        });
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
        const {
            section,
            iconType,
            // onItemsChange
        } = this.props;
        // const { isOnEdit } = this.state;

        if (!section) {
            return (null);
        }

        const iconSizeHeader = '15px';
        const iconSize = '20px';

        return (
            <div className="sidebar-section">
                <div className="sidebar-header">
                    <div className="sidebar-header-title">{section.title}</div>
                    <div className="sidebar-header-btn sidebar-btn" onClick={this.toggleIsOnEdit}>
                        <Icon path={mdIcon['mdiPlus']} size="var(--iconSize)" color="var(--color)" />
                    </div>

                    <div className="sidebar-header-btn sidebar-btn" onClick={this.toggleIsOnEdit}>
                        <Icon path={mdIcon['mdiPencil']} size="var(--iconSize)" color="var(--color)" />
                    </div>
                </div>


                <div className="sidebar-content">

                    {section.items.map((item: SidebarItem, index: number) => {

                        let icon = iconType === 'icon'
                            ? (<Icon path={mdIcon[item.icon]} size="var(--iconSize)" color="var(--color)"/>)
                            : (<FaviconWrapper url={item.link}/>);

                        return (
                            <button key={index} className="sidebar-content-item" onClick={(e) => {this.openLink(item.link)}}>
                                <div className="sidebar-content-item-icon">{icon}</div>
                                <span className="sidebar-content-item-label">{item.label}</span>
                            </button>
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






