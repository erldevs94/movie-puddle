<template>
    <div>
        <input type="text" v-model="text_search"
                        class="absolute bg-gray-50 block border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-500 focus:ring-blue-500 left-5 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                        placeholder="Search a movie" />
        <div class="fixed bottom-10 right-10 flex z-50 align-center text-white">
            <button :disabled="page==1" @click="page--" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
                Prev
            </button>
            <span>Page {{ page }} of {{ results.data.total_pages }}</span>
            <button :disabled="page==results.data.total_pages" @click="page++" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
                Next
            </button> 

        </div>
        <div class="md:grid grid-cols-4 gap-4">
            <div v-for="(item, index) in movie_list" :key="index" style="height: max-content;"
                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative my-2">
                <a href="#">
                    <img class="rounded-t-lg" :src="'https://image.tmdb.org/t/p/original/' + item.poster_path" alt="" />
                    <strong class="absolute top-2 right-2 _desc-color rating">{{ item.vote_average.toFixed(2) }} /
                        10</strong>
                </a>
                <div class="p-5  _desc-color" style="background-color: rgb(13 17 32);">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight  _desc-color">{{
                            item.original_title }}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 _desc-color">{{ item.overview }}</p>
                    <strong>{{ item.release_date }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const route = useRoute()

const page = ref(1); 

const text_search = ref("");

const runtimeConfig = useRuntimeConfig(); 
const results = ref(await useAsyncData(
    'results_data',
    () => $fetch(`${runtimeConfig.public.apiBase}/3/search/movie?query=${text_search}&include_adult=false&language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${runtimeConfig.public.accessAuthToken}`
        },
        params: {
            query: text_search.value,
            page: page.value
        }
    }), {
    watch: [text_search, page]
}
))
var movie_list = computed(() => results.value.data.results);
const refresh = () => refreshNuxtData("results_data");   
</script>

<style lang="scss" scoped>._desc-color {
    color: rgb(233 207 112);
}

.rating {
    background-color: rgb(13, 17, 32);
    padding: 2px 5px;
    border-radius: 5px;
}</style>