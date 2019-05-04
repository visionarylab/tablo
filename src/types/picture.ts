export interface Picture {
    type: string;
    from: string;
    artiste: string;
    artisteBio: string;
    date: string;
    title: string;
    subTitle: string;
    medium: string;
    dimensions: string;
    classification: string;
    credits: string;
    originalData?: any;
    medias: Medias;
}

export interface Medias {
    mini: string;
    medium: string;
    max: string;
    page: string;
}
