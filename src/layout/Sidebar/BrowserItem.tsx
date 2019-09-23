import React, { Component, HTMLAttributes } from 'react';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import { SortableHandle } from 'react-sortable-hoc';
import { BrowserItemType } from 'store/Sidebar';
import './Item.scss';

const Handle = SortableHandle(() => (
    <div className="item-handle item-icon">
        <Icon path={mdIcon.mdiMenu} size="var(--iconSize)" color="var(--color)" />
    </div>
));

interface Props {
    item: BrowserItemType;
    isOnEdit: boolean;
    editItem: () => void;
    toggleItemVisibility: () => void;
}

interface State {
}

export default class BrowserItem extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const {
            item,
            isOnEdit,
            editItem,
            toggleItemVisibility } = this.props;

        if (!item) {
            return (null);
        }

        if (isOnEdit) {
            return (
                <div className="item-wrapper">
                    <Handle />
                    <span className="item-label">{item.label}</span>
                    <div className="flex-separator"></div>
                    <div className="item-control-btn" onClick={toggleItemVisibility}>
                        <Icon path={item.visible ? mdIcon.mdiEyeOffOutline: mdIcon.mdiEyeOutline} size="var(--iconSize)" color="var(--color)" />
                    </div>
                    <div className="item-control-btn" onClick={editItem}>
                        <Icon path={mdIcon.mdiPencilOutline} size="var(--iconSize)" color="var(--color)" />
                    </div>
                </div>
            );
        }

        return (
            <div className="item-wrapper">
                <div className="item-icon">
                <Icon path={mdIcon[item.icon]} size="var(--iconSize)" color="var(--color)" />
                </div>
                <span className="item-label">{item.label}</span>
            </div>
        );
    }
}
