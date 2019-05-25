import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Icon from '@mdi/react'
import { mdiSettings, mdiClose } from '@mdi/js'
import { SearchEngine } from 'store/search';
import { Button } from 'components/Buttons/Button';

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

        return (
            <div className="settings-wrapper">
                <Button isIcon={true} className="settings-icon" onClick={this.showSettings}>
                    <Icon path={mdiSettings} size={1.3} color="black" />
                </Button>

                <Dialog
                    showHeader={false}
                    visible={isShowSettings}
                    modal={false}
                    className="setting-modal-wrapper"
                    onHide={() => null}>

                    <Button className="settings-btn close-settings-btn" isIcon
                        onClick={this.hideSettings}>
                        <Icon path={mdiClose} size={1} />
                    </Button>

                    coucou
                </Dialog>
            </div>
        );
    }
}
