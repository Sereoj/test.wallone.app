import type {LocalizedString} from "~/types/init";
import type {Avatar} from "~/types/avatar";
import type {Level} from "~/types/level";
import type {Achievement} from "~/types/achievement";
import type {Role} from "~/types/role";
import type {Task} from "~/types/task";
import UserBalance from "~/components/modules/profile/UserBalance.vue";

export interface ShortUser {
    username: string;
    slug: string;
    verification: boolean;
    avatar: {
        path: string;
    };
}

export interface LongUser {
    id: number
    username: string
    email: string
    avatars: Avatar[]
    level: Level
    achievements: Achievement[]
    role: Role
    badges: any[]
    using_app: any | null
    user_setting: UserSetting
    status: Status
    employment_status: EmploymentStatus
    location: any | null
    tasks: Task[]
    user_balance: UserBalance[]
    online_status: OnlineStatus
}

export interface UserSetting {
    id: number
    is_online: number
    is_preferences_feed: number
    preferences_feed: string
}

export interface UserBalance {
    id: number
    balance: string
    pending_balance: string
    currency: string
}

export interface Status {
    id: number
    name: LocalizedString
    emoji: string
}

export interface EmploymentStatus {
    id: number
    name: LocalizedString
}

export interface OnlineStatus {
    last_activity: string
    device_type: string
    ip_address: string
}
