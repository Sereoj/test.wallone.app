export type MediaType = 'image' | 'video' | 'filler';

export interface MediaItem {
    type: MediaType;
    src: string;
}

export interface MediaGroup {
    type: 'group';
    group: MediaItem[];
}
