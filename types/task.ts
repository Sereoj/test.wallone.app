import type {LocalizedString} from "~/types/init";

export interface Task {
    id: number
    name: LocalizedString
    description: LocalizedString
    target: number
    period: string
    type: string
    experience_reward: number
}
