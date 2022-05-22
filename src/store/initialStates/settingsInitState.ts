import { IAuthor, ILocation } from '../../types/types';


export interface ISettings {
    name: string,
    author: IAuthor | null,
    location: ILocation | null,
    createdFrom: string,
    createdBefore: string,
    currentPage: number,
    pageSize: number,
    pagesAmount: number,
    isLoading: boolean,
    isDarkTheme: boolean,
    error: unknown
}

export const settingsInitialState:ISettings = {
    name: '',
    author: null,
    location: null,
    createdFrom: '',
    createdBefore: '',
    currentPage: 1,
    pageSize: 12,
    pagesAmount: 1,
    isLoading: false,
    isDarkTheme: false,
    error: null
}
