import { defineStore } from "pinia";
import type { Init } from "~/types/init";
import type { Tag } from "~/types/tag";

export const useInitStore = defineStore("init", {
    state: () => ({
        tags: [] as Tag[],
        options: [] as any[],
        hits: [] as string[],
        hero: [] as any[],
        backgrounds: [] as any[],
        language: "en",
        version: "",
        isLoaded: false,
    }),

    actions: {
        async fetchInit() {
            try {
                const config = useRuntimeConfig();
                const response = await $fetch<Init>("/api/init");
                Object.assign(this.$state, response);
                this.isLoaded = true;
            } catch (error) {
                console.error("Ошибка при загрузке данных init:", error);
            }
        },
    },
});
