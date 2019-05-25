const bookmarks = require('./bookmarks.json');
const ENV = process.env.NODE_ENV;

export default class BookmarkApi {
    static getBookmarks() {
        return new Promise<any>((resolve, reject) => {
            if (ENV === 'development') {
                resolve(bookmarks);
            } else {
                window.chrome.bookmarks.getTree((data: any) => {
                    resolve(data);
                });
            }
        });
    }
}
