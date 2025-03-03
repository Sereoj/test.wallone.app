export interface LocalizedString {
    ru: string;
    en: string;
}

export interface Tag {
    name: LocalizedString;
    slug: string;
    count: number;
}

export interface Option {
    label: LocalizedString;
    value: string;
}

export interface Init {
    tags: Tag[];
    options: Option[];
    hits: string[];
    hero: string[];
    backgrounds: string[];
    language: string;
    version: string;
}
