import { SearchState } from 'store/search';
import { PictureState } from 'store/picture';
import { BookmarkState } from './bookmarks';


export const bookmarkStateKey: string = 'bookmarkState';
export const defaultBookmarkState: BookmarkState = {
    folders: [],
    foldersFiltered: [],
    isAllExpanded: false,
    query: ''
};

export const pictureStateKey: string = 'pictureState';
export const defaultPictureState: PictureState = {
    currentPictureIndex: null,
    pictures: [],
    maxPicturesCount: 100
};

export const searchStatekey: string = 'searchState';
export const defaultSearchState: SearchState = {
    selectedSearchEngineId: null,
    searchInNewTab: true,
    searchEngines: [{
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