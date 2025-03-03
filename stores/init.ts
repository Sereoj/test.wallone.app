import { defineStore } from "pinia";
import type { Init } from "~/types/init";

export const useInitStore = defineStore("init", {
    state: () => ({
        tags: [] as string[],
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
                const { $axios } = useNuxtApp();
                const response = await $axios.get<Init>("/public/api/init");
                Object.assign(this.$state, response.data);
                this.isLoaded = true;
            } catch (error) {
                console.error("Ошибка при загрузке данных init:", error);
            }
        },
    },
});
