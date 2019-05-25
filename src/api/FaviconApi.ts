const ENV = process.env.NODE_ENV;

export default class FaviconApi {
    static getFaviconUrl(url: string) {
        try {
            if (ENV === 'development') {
                // const prefixLessUrl = new URL(url || "").hostname;
                // return `https://api.faviconkit.com/${prefixLessUrl}/32`;
                return '/assets/images/favicon_fallback.png';
            } else {
                return `chrome://favicon/size/16@2x/${url}`;
            }
        } catch (err) {
          return "";
        }
      }
}
