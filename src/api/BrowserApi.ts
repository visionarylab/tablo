import Utils from './Utils';

const ENV = process.env.NODE_ENV;
// import * as browser from 'webextension-polyfill/dist/browser-polyfill.min';
const browser = require("webextension-polyfill/dist/browser-polyfill.min");

export default class BrowserApi {
    static getBookmarksTree() {
        return ENV === 'development'
            ? Promise.resolve(require('./bookmarks.json'))
            : browser.bookmarks.getTree();
    }

    static openUrlInCurrentTab(url: string) {
        return ENV === 'development'
            ? Promise.resolve(window.open(url, '_self'))
            : browser.tabs.update({ url });
    }

    static openUrlInNewTab(url: string) {
        return ENV === 'development'
            ? Promise.resolve(window.open(url, '_blank'))
            : browser.tabs.create({ url });
    }

    static getFaviconUrl(url: string) {
        if (ENV === 'development' || Utils.isFirefoxExtension()) {
            const prefixLessUrl = new URL(url || "").hostname;
            return `https://api.faviconkit.com/${prefixLessUrl}/40`;
        } else {
            return `chrome://favicon/size/16@2x/${url}`;
        }
    }
}
