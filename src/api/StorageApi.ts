const ENV = process.env.NODE_ENV;
declare var window: any;

export default class StorageApi {

    static getItems(key: string, defaultValue: any) {
        return new Promise<any>((resolve, reject) => {
            if (ENV === 'development') {
                const stringData = localStorage.getItem(key);
                let data;
                try {
                    data = stringData ? JSON.parse(stringData) : defaultValue;
                } catch (e) {
                    data = defaultValue;
                }
                resolve(data);
            } else {
                window.chrome.storage.local.get(defaultValue, (data: any) => {
                    resolve(data);
                });
            }
        });
    }

    static setItems(key: string, value: any) {
        return new Promise<any>((resolve, reject) => {
            if (ENV === 'development') {
                localStorage.setItem(key, JSON.stringify(value));
                resolve(true);
            } else {
                window.chrome.storage.local.set(value, () => {
                    resolve(true);
                });
            }
        });
    };
}
