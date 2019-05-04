import {
    LOAD_SEARCHBAR_CONFIG,
    SELECT_SEARCH_ENGINE,
    ADD_SEARCH_ENGINE,
    UPDATE_SEARCH_ENGINE,
    DELETE_SEARCH_ENGINE,
    SEARCH_IN_NEW_TAB_TRUE,
    SEARCH_IN_NEW_TAB_FALSE } from '../actionTypes';
import { SearchBarConfig } from 'types/search-bar-config';

const INITIAL_STATE: SearchBarConfig = {
    selectedItemId: null,
    searchInNewTab: true,
    items: [{
        id: '250e80a2-1390-46ed-9165-41b1f08984e7',
        pos: 0,
        name: 'Google',
        baseUrl: 'http://www.google.com/search',
        queryParam: 'q',
        params: []
    },
    {
        id: '101e2c7a-18b7-4cd1-a083-1832e04c8854',
        pos: 0,
        name: 'YouTube',
        baseUrl: 'https://www.youtube.com/results',
        queryParam: 'search_query',
        params: [
            {
                key: 'utm_source',
                value: 'opensearch'
            }
        ]
    },
    {
        id: '9d71958f-31ec-49ba-8533-941d65a6438c',
        pos: 0,
        name: 'DuckDuckGo',
        baseUrl: 'https://duckduckgo.com',
        queryParam: 'q',
        params: [
            {
                key: 'kp',
                value: -2
            },
            {
                key: 'k1',
                value: -1
            },
            {
                key: 'kaj',
                value: 'm'
            },
        ]
    },
    {
        id: '748b90c5-db69-4a05-b279-cf2164b081ea',
        pos: 0,
        name: 'Qwant',
        baseUrl: 'https://www.qwant.com',
        queryParam: 'q',
        params: [
            {
                key: 't',
                value: 'web'
            }
        ]
    },
    {
        id: 'd3e317e3-7ef4-4a9a-a697-e69cd789603d',
        pos: 0,
        name: 'Wikipedia',
        baseUrl: 'http://www.wikipedia.org/search-redirect.php',
        queryParam: 'search',
        params: [
            {
                key: 'language',
                value: 'fr'
            }
        ]
    },
    {
        id: '6',
        pos: 0,
        name: 'Larousse',
        baseUrl: 'https://www.larousse.fr/dictionnaires/rechercher',
        queryParam: 'q',
        params: [
            {
                key: 'l',
                value: 'francais'
            },
            {
                key: 'l',
                value: 'francais'
            }
        ]
    },
    {
        id: 'd89ab2d7-8db2-4584-ace1-518df88280fa',
        pos: 0,
        name: 'Wikipedia',
        baseUrl: 'https://fr.wikipedia.org/w/index.php',
        queryParam: 'search',
        params: [
            {
                key: 'ns0',
                value: '1'
            },
            {
                key: 'go',
                value: 'Continuer'
            },
            {
                key: 'title',
                value: 'Sp%C3%A9cial%3ARecherche'
            }
        ]
    }]
}

export default (state: SearchBarConfig = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case LOAD_SEARCHBAR_CONFIG:
        return {
            ...state,
            ...action.payload
        };

        case SELECT_SEARCH_ENGINE:
        return {
            ...state,
            selectedItemId: action.payload
        };

        case ADD_SEARCH_ENGINE:
        return {
            ...state,
            items: [
                ...state.items,
                action.payload
            ]
        };

        case UPDATE_SEARCH_ENGINE:
        return {
            ...state,
            items: state.items.map(item => {
                return (item.id === action.payload.id)
                    ? action.payload
                    : item;
            })
        };

        case DELETE_SEARCH_ENGINE:
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
        };

        case SEARCH_IN_NEW_TAB_TRUE:
        return {
            ...state,
            searchInNewTab: true
        };

        case SEARCH_IN_NEW_TAB_FALSE:
        return {
            ...state,
            searchInNewTab: false
        };

        default:
        return state;
    }
  };