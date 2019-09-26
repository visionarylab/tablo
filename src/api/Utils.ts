// const ENV = process.env.NODE_ENV;

export default class Utils {

    static parseJson(stringData: string): any {
        let data: any;
        try {
            data = JSON.parse(stringData);
        } catch (e) {
            data = null;
        }
        return data;
    }

    static isFirefoxExtension(): boolean {
        return typeof (window as any).InstallTrigger !== 'undefined';
    }

}
