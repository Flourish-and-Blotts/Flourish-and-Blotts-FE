export interface ChartData<T> {
    data: T[]
}

export interface Data {
    date: string,
    data: number
}

export interface Book {
    id?: string,
    imageUrl: string[],
    title: string,
    description: string,
    price: number,
    authorId: string,
    authorName?: string
}

export interface Author {
    id: string,
    name: string,
}