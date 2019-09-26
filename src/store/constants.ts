import { PictureState } from 'store/picture/picture';
import { BookmarkState } from 'store/bookmarks/bookmarks';
import { SidebarState } from 'store/sidebar/sidebar';

// Bookmarks state
export const bookmarkStateKey: string = 'bookmarkState';
export const defaultBookmarkState: BookmarkState = {
    bookmarks: null,
    bookmarksFiltered: null,
    query: ''
};


// Picture state
export const pictureStateKey: string = 'pictureState';
export const defaultPictureState: PictureState = {
    currentPictureIndex: null,
    pictures: [],
    maxPicturesCount: 100,
    showDetails: false,
    showHistory: false
};

// Sidebar state
export const CHROME_SECTION = {
    title: 'Chrome tools',
    isDeletable: false,
    isHidable: true,
    expanded: true,
    items: [
    {
        link: 'chrome://apps',
        label: 'apps',
        icon: 'mdiViewGrid',
        visible: true,
    },
    {
        link: 'chrome://bookmarks',
        label: 'bookmarks',
        icon: 'mdiStarOutline',
        visible: true,
    },
    {
        link: 'chrome://downloads',
        label: 'downloads',
        icon: 'mdiDownload',
        visible: true,
    },
    {
        link: 'chrome://history',
        label: 'history',
        icon: 'mdiClockOutline',
        visible: true,
    },
    {
        link: 'chrome://extensions/',
        label: 'Extensions',
        icon: 'mdiPuzzle',
        visible: true,
    },
    {
        link: 'chrome://settings',
        label: 'settings',
        icon: 'mdiSettingsOutline',
        visible: true,
    },
    {
        link: 'chrome://inspect/#devices',
        label: 'Inspect',
        icon: 'mdiAndroidDebugBridge',
        visible: true,
    },
    {
        link: 'chrome://omnibox/',
        label: 'omnibox',
        icon: 'mdiSearchWeb',
        visible: true,
    },
    {
        link: 'chrome://site-engagement/',
        label: 'site engagement',
        icon: 'mdiPoll',
        visible: true,
    }
]};

export const FIREFOX_SECTION = {
    title: 'Firefox tools',
    isDeletable: false,
    isHidable: true,
    expanded: true,
    items: [
        {
        link: 'chrome://apps',
        label: 'apps',
        icon: 'mdiViewGrid',
        visible: true,
    },
    {
        link: 'chrome://bookmarks',
        label: 'bookmarks',
        icon: 'mdiStarOutline',
        visible: true,
    },
    {
        link: 'chrome://downloads',
        label: 'downloads',
        icon: 'mdiDownload',
        visible: true,
    },
    {
        link: 'chrome://history',
        label: 'history',
        icon: 'mdiClockOutline',
        visible: true,
    },
    {
        link: 'chrome://extensions/',
        label: 'Extensions',
        icon: 'mdiPuzzle',
        visible: true,
    },
    {
        link: 'chrome://settings',
        label: 'settings',
        icon: 'mdiSettingsOutline',
        visible: true,
    },
    {
        link: 'chrome://inspect/#devices',
        label: 'Inspect',
        icon: 'mdiAndroidDebugBridge',
        visible: true,
    },
    {
        link: 'chrome://omnibox/',
        label: 'omnibox',
        icon: 'mdiSearchWeb',
        visible: true,
    },
    {
        link: 'chrome://site-engagement/',
        label: 'site engagement',
        icon: 'mdiPoll',
        visible: true,
    }
]};

export const SITE_SECTION = {
    title: 'Site',
    isDeletable: true,
    isHidable: false,
    expanded: true,
    items: [
    {
        label: 'internetactu',
        link: 'http://www.internetactu.net/',
    },
    {
        label: 'youtube',
        link: 'https://www.youtube.com/?gl=FR&hl=fr',
    },
    {
        label: 'duckduckgo',
        link: 'https://duckduckgo.com/',
    },
    {
        label: 'torrent9',
        link: 'http://www.torrent9.red/',
    },
    {
        label: 'ygg',
        link: 'https://yggtorrent.is/',
    },
    {
        label: '9gag',
        link: 'http://9gag.com/',
    },
    {
        label: 'korben',
        link: 'https://korben.info/',
    },
    {
        label: 'torrent9',
        link: 'http://www.torrent9.red/',
    },
]};

export const sidebarStateKey: string = 'sidebarState';
export const defaultSidebarState: SidebarState = {
    browserSection: CHROME_SECTION,
    userSection: SITE_SECTION,
    isOnEdit: false,
    itemOnEdit: null,
};
