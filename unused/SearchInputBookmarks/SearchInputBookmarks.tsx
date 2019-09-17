import React, { Component } from 'react';
import Button from 'components/Buttons/Button';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

import './SearchInputBookmarks.scss';

interface props {
    query: any;
    onChange: any;
}
class SearchInputBookmarks extends Component<props> {
    render() {
        const { query, onChange } = this.props;

        return (
            <div className="search-input-bookmarks-wrapper">
                <Button isIcon={true} className="search-bookmarks-icon">
                    <Icon path={mdiMagnify} size={1} color="white" />
                </Button>
                <input
                    className="search-bookmarks-input"
                    placeholder="Search bookmarks..."
                    type="text"
                    onChange={onChange}
                    value={query}/>
            </div>
        );
    }
}

export default SearchInputBookmarks;
