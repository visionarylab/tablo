import { any } from "prop-types";

export interface SearchBarConfig {
    items: SearchEngine[];
    selectedItemId: string | any;
    searchInNewTab: boolean;
}

export interface SearchEngine {
    id: string;
    pos: number;
    name: string;
    baseUrl: string;
    queryParam: string;
    params: SearchEngineParam[];
}

export interface SearchEngineParam {
    key: string;
    value: string | number;
}