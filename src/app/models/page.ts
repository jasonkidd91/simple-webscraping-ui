export class Page<T> {
    content: T;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: any;
    size?: number;
    sort?: any;
    totalElements?: number;
    totalPages: number;

    constructor(page: number, content: T) {
        this.number = page;
        this.content = content;
    }
}