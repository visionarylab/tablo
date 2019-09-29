import Utils from './Utils';

const ENV = process.env.NODE_ENV;
// import * as browser from 'webextension-polyfill/dist/browser-polyfill.min';

let browser;
if (typeof (window as any).browser === 'undefined' && ENV !== 'development') {
    browser = require("webextension-polyfill/dist/browser-polyfill.min");
} else {
    browser = (window as any).browser;
}


// export default class BrowserApi {
//     static getBookmarksTree() {
//         return ENV === 'development'
//             ? Promise.resolve(require('./bookmarks.json'))
//             : browser.bookmarks.getTree();
//     }

//     static openUrlInCurrentTab(url: string) {
//         return ENV === 'development'
//             ? Promise.resolve(window.open(url, '_self'))
//             : browser.tabs.update({ url });
//     }

//     static openUrlInNewTab(url: string) {
//         return ENV === 'development'
//             ? Promise.resolve(window.open(url, '_blank'))
//             : browser.tabs.create({ url });
//     }

//     static getFaviconUrl(url: string) {
//         console.log('getFaviconUrl', url)
//         if (ENV === 'development' || Utils.isFirefoxExtension()) {
//             try {
//                 const prefixLessUrl = new URL(url || "").hostname;
//                 return `https://api.faviconkit.com/${prefixLessUrl}/40`;
//             } catch (error) {
//                 return '';
//             }
//         } else {
//             return `chrome://favicon/size/16@2x/${url}`;
//         }
//     }
// }

class DevApi {
    static getBookmarksTree() {
        return Promise.resolve(require('./bookmarks.json'));
    }

    static openUrlInCurrentTab(url: string) {
        return Promise.resolve(window.open(url, '_self'));
    }

    static openUrlInNewTab(url: string) {
        return Promise.resolve(window.open(url, '_blank'));
    }

    static getFaviconUrl(url: string) {
        try {
            const prefixLessUrl = new URL(url || "").hostname;
            return `https://api.faviconkit.com/${prefixLessUrl}/40`;
        } catch (error) {
            return '';
        }
    }
}

class FirefoxApi {
    static getBookmarksTree() {
        return browser.bookmarks.getTree();
    }

    static openUrlInCurrentTab(url: string) {
        return browser.tabs.update({ url });
    }

    static openUrlInNewTab(url: string) {
        return browser.tabs.create({ url });
    }

    static getFaviconUrl(url: string) {
        try {
            const prefixLessUrl = new URL(url || "").hostname;
            return `https://api.faviconkit.com/${prefixLessUrl}/40`;
        } catch (error) {
            return '';
        }
    }
}

class ChromeApi {
    static getBookmarksTree() {
        return browser.bookmarks.getTree();
    }

    static openUrlInCurrentTab(url: string) {
        return browser.tabs.update({ url });
    }

    static openUrlInNewTab(url: string) {
        return browser.tabs.create({ url });
    }

    static getFaviconUrl(url: string) {
        return `chrome://favicon/size/16@2x/${url}`;
    }
}

let BrowserApi: any;
if (ENV === 'development') {
    BrowserApi = DevApi;
} else {

    if (Utils.isFirefoxExtension()) {
        BrowserApi = FirefoxApi;
    } else {
        BrowserApi = ChromeApi;
    }
}

export default BrowserApi;
