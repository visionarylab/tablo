import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import { SortableHandle } from 'react-sortable-hoc';
import { SectionItem } from 'store/sidebar/sidebar';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';
import './SidebarSectionItem.scss';

const Handle = SortableHandle(() => (
    <div className="item-handle item-icon">
        <Icon path={mdIcon.mdiMenu} size="var(--iconSize)" color="var(--color)" />
    </div>
));

interface Props {
    item: SectionItem | any;
    isOnEdit: boolean;
    isHidable: boolean;
    isDeletable: boolean;
    editItem: () => void;
    deleteItem: () => void;
    toggleShowItem: () => void;
}

interface State {
}

export default class SidebarSectionItem extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const {
            item,
            isOnEdit,
            isHidable,
            isDeletable,
            editItem,
            deleteItem,
            toggleShowItem } = this.props;

        const classnames = classNames('item-wrapper', {
            'item-hidden': isHidable && !item.visible
        });

        if (!item) {
            return (null);
        }

        return (
            <div className={classnames}>
                {isOnEdit &&
                    <Handle />
                }

                {!isOnEdit && item.icon &&
                    <div className="item-icon">
                    <Icon path={mdIcon[item.icon]} size="var(--iconSize)" color="var(--color)" />
                    </div>
                }

                {!isOnEdit && !item.icon &&
                    <div className="item-icon">
                        <FaviconWrapper url={item.link}/>
                    </div>
                }

                <span className="item-label">{item.label}</span>

                {isOnEdit &&  <>
                    <div className="flex-separator"></div>

                    {isHidable &&
                        <div className="item-control-btn" onClick={toggleShowItem}>
                        <Icon path={item.visible ? mdIcon.mdiEyeOffOutline : mdIcon.mdiEyeOutline}
                            size="var(--iconSize)" color="var(--color)" />
                        </div>
                    }

                    {/*
                    <div className="item-control-btn" onClick={editItem}>
                        <Icon path={mdIcon.mdiPencilOutline} size="var(--iconSize)" color="var(--color)" />
                    </div>
                    */}

                    {isDeletable &&
                    <div className="item-control-btn" onClick={deleteItem}>
                        <Icon path={mdIcon.mdiClose} size="var(--iconSize)" color="var(--color)" />
                    </div>
                    }

                </>}
            </div>
        );

    }
}
