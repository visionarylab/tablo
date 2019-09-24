import React, { Component, HTMLAttributes } from 'react';
import Icon from '@mdi/react';
import * as mdIcon from '@mdi/js';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import SidebarSectionItem from 'components/SidebarSectionItem/SidebarSectionItem';
import { Section, SectionItem } from 'store/sidebar/sidebar';
import './SidebarSection.scss';

const List = SortableContainer(({ children }) => (
    <div className="section-content">
        {children}
    </div>
));

const ListItem = SortableElement(({ item, index, isOnEdit, isHidable, isDeletable, editItem, deleteItem, toggleShowItem }) => {
    return (
        <SidebarSectionItem
            item={item}
            isOnEdit={isOnEdit}
            isHidable={isHidable}
            isDeletable={isDeletable}
            editItem={() => editItem(item, index)}
            deleteItem={() => deleteItem(item, index)}
            toggleShowItem={() => toggleShowItem(item, index)}
        />
    );
});

interface Props {
    section: Section;
    onSectionChange: (section: Section) => void;
}

interface State {
    isOnEdit: boolean;
}

class SidebarSection extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            isOnEdit: false,
        };

        this.toggleEditSection = this.toggleEditSection.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleShowItem = this.toggleShowItem.bind(this);
        this.onSortStart = this.onSortStart.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    toggleEditSection() {
        const { isOnEdit } = this.state;
        this.setState({ isOnEdit: !isOnEdit });
    }

    editItem(item: SectionItem, index: number) {
        const { section, onSectionChange } = this.props;

        // onSectionChange(section);
    }

    deleteItem(item: SectionItem, index: number) {
        const { section, onSectionChange } = this.props;
        if (section.items[index]) {
            section.items.splice(index, 1);
        }
        onSectionChange(section);
    }

    toggleShowItem(item: SectionItem, index: number) {
        const { section, onSectionChange } = this.props;
        if (section.items[index]) {
            section.items[index].visible = !section.items[index].visible;
        }
        onSectionChange(section);
    }

    onSortStart(event: any) {
        document.body.style.cursor = 'grabbing';
    }

    onSortEnd({ oldIndex, newIndex }) {
        document.body.style.cursor = 'default';
        const { section, onSectionChange } = this.props;
        section.items = arrayMove(section.items, oldIndex, newIndex);
        onSectionChange(section);
    }

    render() {
        const {
            section,
            children } = this.props;

        const { isOnEdit } = this.state;

        if (!section) {
            return (null);
        }

        let items: SectionItem[] = (section.isHidable && !isOnEdit)
            ? section.items.filter((item: SectionItem) => item.visible)
            : section.items;

        return (
            <div className="section-wrapper">
                <div className="section-header">
                    <div className="section-header-title">{section.title}</div>

                    <div className="flex-separator"></div>

                    {/*
                    <div className="section-header-btn" onClick={()=> {}}>
                        <Icon path={mdIcon.mdiPlus} size="var(--iconSize)" color="var(--color)" />
                    </div>
                    */}

                    <div className="section-header-btn" onClick={this.toggleEditSection}>
                        <Icon path={mdIcon.mdiPencil} size="var(--iconSize)" color="var(--color)" />
                    </div>
                </div>

                <List
                    axis="xy"
                    useDragHandle={true}
                    lockToContainerEdges={true}
                    helperClass="grid-item-helper"
                    onSortEnd={this.onSortEnd}
                    onSortStart={this.onSortStart}>

                    {items.map((item: SectionItem, index: number) => (

                        <ListItem
                            key={index}
                            item={item}
                            index={index}
                            isOnEdit={isOnEdit}
                            disabled={!isOnEdit}
                            isHidable={section.isHidable}
                            isDeletable={section.isDeletable}
                            editItem={() => this.editItem(item, index)}
                            deleteItem={() => this.deleteItem(item, index)}
                            toggleShowItem={() => this.toggleShowItem(item, index)}
                        />

                    ))}
                </List>
            </div>
        );
    }

}

export default SidebarSection;
