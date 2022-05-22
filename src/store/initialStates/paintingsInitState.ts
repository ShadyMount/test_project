import { IAuthor, ILocation, IPainting } from "../../types/types"

export interface IPaintings {
    paintings: IPainting[],
    locations: ILocation[],
    authors: IAuthor[],
    currentPage: number,
    pageSize: number,
    pagesAmount: number,
    isLoading: boolean,
    error: unknown
}

export const paintingsInitialState:IPaintings = {
    paintings: [],
    locations: [],
    authors: [],
    currentPage: 1,
    pageSize: 12,
    pagesAmount: 3,
    isLoading: false,
    error: null
}
