import type {LocalizedString} from "~/types/init";

export interface Achievement {
    id: number
    name: LocalizedString
    description: LocalizedString
    points: number
}
