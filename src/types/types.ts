export interface IPainting {
    authorId: number,
    created: number,
    id: number,
    imageUrl: string,
    locationId: number,
    name: string
}

export interface IAuthor {
    id: number,
    name: string
}

export interface ILocation {
    id: number,
    location: string
}