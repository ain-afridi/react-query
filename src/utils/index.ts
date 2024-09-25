export interface ISuperHero {
    id: number;
    name: string;
    alterEgo: string
}

export interface IAddSuperHero {
    name: string;
    alterEgo: string
}

export interface IFriends {
    id: number;
    name: string;
}

export interface IUsers {
    id: string;
    channelId: string
}

export interface IChannels {
    id: string;
    courses: string[]
}

export interface IColors {
    id: string;
    label: string;
}

export interface IInfiniteQueryResponse {
    data: IColors[]
    first: number
    items: number
    last: number
    next: number
    pages: number
}