import { Tag } from "./tag";

export class CatalogItem {
    id?: string
    code: string
    codeUrl: string
    tags?: Array<Tag>
    title: string
    linkUrl: string
    imageUrl: string
    date: string
}