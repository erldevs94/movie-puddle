<template>
    <div>
        <h1 class="text-white">Trending Movies</h1>
        <div class="fixed bottom-10 right-10 z-10 align-center text-white" style="background-color: #0d1120;">
            <button :disabled="page==1" @click="page--" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
                Prev
            </button>
            <span>Page {{ page }} of {{ total_page }}</span>
            <button @click="page++" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
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
                <div class="p-5  _desc-color" style="background-color: #0d1120;">
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

<script lang="ts" module="es2022" setup>
import { refreshNuxtData, useAsyncData } from 'nuxt/app';
import { onMounted, ref, reactive } from 'vue';
const runtimeConfig = useRuntimeConfig(); 
const page = ref(1);
const total_page = ref(0);
const { data: results } = await useAsyncData(
    'results_data',
    () => $fetch(`${runtimeConfig.public.apiBase}/3/trending/movie/day?language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${runtimeConfig.public.accessAuthToken}`
        },
        params: {
            page: page.value
        }
    }), {
    watch: [page]
}
)
var movie_list:[] = computed(() => results.value.results);

total_page.value = results.value.total_pages

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