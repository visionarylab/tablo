import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import api from '../../api';
import './Sidebar.scss';
import { SidebarSectionItem, SidebarItem } from 'store/Sidebar';



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
        if (window.chrome.tabs) {
            // window.chrome.tabs.update({ url });
            window.chrome.tabs.create({ url });
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
                        <Icon path={mdIcon['mdiPlus']} size={iconSizeHeader} />
                    </div>

                    <div className="sidebar-header-btn sidebar-btn" onClick={this.toggleIsOnEdit}>
                        <Icon path={mdIcon['mdiPencil']} size={iconSizeHeader} />
                    </div>
                </div>


                <div className="sidebar-content">

                    {section.items.map((item: SidebarItem, index: number) => {

                        let icon: any;

                        const onError = (e) => {
                            console.log(e)
                            e.target.src = encodeURI(`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><path fill="white" d="${mdIcon['mdiWeb']}"/></svg>`);
                        }

                        if (iconType === 'icon') {
                            icon = (<Icon path={mdIcon[item.icon]} size={iconSize} />)
                        } else if (iconType === 'img') {
                            const img = api.favicon.getFaviconUrl(item.link);
                            icon = (<img onError={onError} src={img} />);
                            // <Icon className="sidebar-content-item-icon" path={mdIcon['mdiWeb']} size={iconSize} />
                        }

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






