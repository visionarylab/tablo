import React, { Component } from 'react';
// import { Dialog } from 'primereact/dialog';
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Icon from '@mdi/react'
import { mdiSettings, mdiClose } from '@mdi/js'
import { SearchEngine } from 'store/search';
import { Button } from 'components/Buttons/Button';
import { Modal } from 'components/Modal/Modal';

import './Settings.scss';

/*
const SortableItem = SortableElement(({ item }) => (

    <li>
        <div>{item.title}</div>
    </li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});
*/

interface Props {
    selectedSearchEngine: SearchEngine | null;
    searchInNewTab: boolean;
}

interface State {
    isShowSettings: boolean;
}

export default class Settings extends Component<Props, State> {

    static defaultProps: Props = {
        selectedSearchEngine: null,
        searchInNewTab: true,
    };

    state: State = {
        isShowSettings: false,
    };

    constructor(props: any) {
        super(props);

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
    }

    showSettings() {
        this.setState({ isShowSettings: true });
    }

    hideSettings() {
        this.setState({ isShowSettings: false });
    }

    render() {
        const { isShowSettings } = this.state;
        const modalStyle = {
            // padding: 'calc(80px + 36px + 5px) 80px 80px 80px'
            // padding: '80px 80px calc(40px + 36px + 5px) 80px'
            // padding: '40px',
            backgroundColor: '#282c34',
        };

        return (
            <div className="settings-wrapper">
                <button className="settings-btn" onClick={this.showSettings}>
                    <Icon path={mdiSettings} size={1.1} color="white" />
                </button>

                <Modal
                    style={modalStyle}
                    show={isShowSettings}
                    onHide={this.hideSettings}>
                    coucou
                </Modal>
            </div>
        );
    }
}
