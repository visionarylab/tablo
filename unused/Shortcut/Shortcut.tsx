import React, { FC, Component } from 'react';
import Icon from '@mdi/react';
import { mdiPencil, mdiDelete, mdiMenu } from '@mdi/js';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove
} from 'react-sortable-hoc';
import api from 'api';
import './Shortcut.scss';


const originalItem = [
    {
        name: 'internetactu',
        link: 'http://www.internetactu.net/',
    },
    {
        name: 'youtube',
        link: 'https://www.youtube.com/?gl=FR&hl=fr',
    },
    {
        name: 'duckduckgo',
        link: 'https://duckduckgo.com/',
    },
    {
        name: 'torrent9',
        link: 'http://www.torrent9.red/',
    },
    {
        name: 'ygg',
        link: 'https://yggtorrent.is/',
    },
    {
        name: '9gag',
        link: 'http://9gag.com/',
    },
    {
        name: 'korben',
        link: 'https://korben.info/',
    },
    {
        name: 'torrent9',
        link: 'http://www.torrent9.red/',
    },
];



const Handle = SortableHandle(({ className }) => (
    <div className="grid-item-handle">
        <Icon path={mdiMenu} size={1} color="white" />
    </div>
));

const Controls = ({ onEdit, onDelete }) => (
    <div className="grid-item-controls">
        <button className="grid-item-btn" onClick={onEdit}>
            <Icon path={mdiPencil} size={1} color="white" />
        </button>

        <button className="grid-item-btn" onClick={onDelete}>
            <Icon path={mdiDelete} size={1} color="white" />
        </button>
    </div>
);

const GridItem = SortableElement(({ item, isEditable }) => {
    const img = api.favicon.getFaviconUrl(item.link);

    return (
        <div className="grid-item">
            <div className="grid-item-background" style={{ backgroundImage: `url(${img})` }}>
                {isEditable && <Handle />}
                {isEditable && <Controls onEdit={() => { }} onDelete={() => { }} />}
            </div>
            <div className="grid-item-text">{item.name}</div>
        </div>
    );

});

const Grid = SortableContainer(({ children }) => (
    <div className="grid">
        {children}
    </div>
));


interface Item {
    id?: number,
    name: string;
    link: string;
    icon?: string;
}
interface SelectedItem {
    item: Item;
    index: number;
}

interface Props {
}

interface State {
    items: Item[];
    itemsCache?: Item[];
    isEditable: boolean;
    itemSize: number;
    gridWidth: string;
}

class Shortcut extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            items: originalItem,
            isEditable: false,
            itemSize: 100,
            gridWidth: '100%'
        }

        this.onSortEnd = this.onSortEnd.bind(this);
        this.toggleIsEditable = this.toggleIsEditable.bind(this);
        this.updateGridWidth = this.updateGridWidth.bind(this);
    }

    componentWillMount() {
        this.updateGridWidth();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateGridWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateGridWidth);
    }

    updateGridWidth() {
        const { itemSize } = this.state;

        const winWidth = window.document.documentElement.clientWidth;
        const boxesPerRow = Math.floor(winWidth / itemSize);

        this.setState({
            gridWidth: `calc(${itemSize}px * ${boxesPerRow} )`,
        });
    }

    toggleIsEditable() {
        this.setState({ isEditable: !this.state.isEditable });
    }

    onSortStart(event: any) {
        document.body.style.cursor = 'grabbing';
    }

    onSortEnd({ oldIndex, newIndex }) {
        document.body.style.cursor = 'default';
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    }

    render() {
        const {
            items,
            isEditable,
            gridWidth } = this.state;

        return (
            <div className="shortcut-wrapper" >
                <div className="shortcut-header">
                    <button onClick={this.toggleIsEditable}>
                        {!isEditable && 'Edit'}
                        {isEditable && 'Save'}
                    </button>
                </div>

                <div className="shortcut-grid" style={{ width: gridWidth }}>
                    <Grid
                        axis="xy"
                        useDragHandle={true}
                        lockToContainerEdges={true}
                        helperClass="grid-item-helper"
                        onSortEnd={this.onSortEnd}
                        onSortStart={this.onSortStart}>

                        {items.map((item, index) => (
                            <GridItem
                                key={`item-${item.name + index}`}
                                index={index}
                                item={item}
                                disabled={!isEditable}
                                isEditable={isEditable}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        );
    }
}






interface EditItemProps {
    index: number;
    item: Item;
    onChange: (item?: Item, index?: number) => void
}

interface EditItemState {
    item: Item;
}

class ItemForm extends Component<EditItemProps, EditItemState> {

    constructor(props: any) {
        super(props);

        this.state = {
            item: props.item,
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onLinkChange = this.onLinkChange.bind(this);
    }

    onNameChange(event: any) {
        const { item } = this.state;
        item.name = event.target.value;
        this.setState({ item });
    }

    onLinkChange(event: any) {
        const { item } = this.state;
        item.link = event.target.value;
        this.setState({ item });
    }

    render() {
        const { index, onChange } = this.props;
        const { item } = this.state;

        return (
            <div>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={this.onNameChange} />

                <input
                    type="text"
                    name="link"
                    value={item.link}
                    onChange={this.onLinkChange} />

                <input type="button" value="Cancel" onClick={() => onChange()} />
                <input type="button" value="Add" onClick={() => onChange(item, index)} />
            </div>
        )
    }
}

export default Shortcut;
