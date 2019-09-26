import React, { Component, HTMLAttributes } from 'react';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import { SortableHandle } from 'react-sortable-hoc';
import { SectionItem } from 'store/sidebar/sidebar';
import FaviconWrapper from 'components/FaviconWrapper/FaviconWrapper';
import { SidebarItem, Text, SidebarItemIcon, SidebarItemHandle,
    SidebarItemBtn, FlexSeparator } from 'components/ui';

const Handle = SortableHandle(() => (
    <SidebarItemHandle>
        <Icon path={mdIcon.mdiMenu} size="var(--iconSize)" color="var(--color)" />
    </SidebarItemHandle>
));

interface Props {
    item: SectionItem | any;
    isOnEdit: boolean;
    isHidable: boolean;
    isDeletable: boolean;
    editItem: () => void;
    deleteItem: () => void;
    toggleShowItem: () => void;
    click: () => void;
}

interface State {
}

export default class SidebarSectionItem extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    render() {
        const {
            item,
            isOnEdit,
            isHidable,
            isDeletable,
            // editItem,
            deleteItem,
            toggleShowItem,
            click } = this.props;

        if (!item) {
            return (null);
        }

        const opacity = (isHidable && !item.visible) ? 0.5 : 1;

        return (
            <SidebarItem opacity={opacity} onClick={click}>
                {isOnEdit &&
                    <Handle />
                }

                {!isOnEdit && item.icon &&
                    <SidebarItemIcon>
                    <Icon path={mdIcon[item.icon]} size="var(--iconSize)" color="var(--color)" />
                    </SidebarItemIcon>
                }

                {!isOnEdit && !item.icon &&
                    <SidebarItemIcon>
                        <FaviconWrapper url={item.link}/>
                    </SidebarItemIcon>
                }

                <Text>{item.label}</Text>

                {isOnEdit &&  <>

                    <FlexSeparator/>

                    {isHidable &&
                    <SidebarItemBtn onClick={toggleShowItem}>
                        <Icon path={item.visible ? mdIcon.mdiEyeOffOutline : mdIcon.mdiEyeOutline}
                            size="var(--iconSize)" color="var(--color)" />
                    </SidebarItemBtn>
                    }

                    {/*
                    <SidebarItemBtn onClick={editItem}>
                        <Icon path={mdIcon.mdiPencilOutline} size="var(--iconSize)" color="var(--color)" />
                    </SidebarItemBtn>
                    */}

                    {isDeletable &&
                    <SidebarItemBtn onClick={deleteItem}>
                        <Icon path={mdIcon.mdiClose} size="var(--iconSize)" color="var(--color)" />
                    </SidebarItemBtn>
                    }

                </>}
            </SidebarItem>
        );

    }
}
