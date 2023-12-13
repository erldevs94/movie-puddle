<template>
    <div>
        <div>
            HERE
        </div>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="(item, index) in movie_list" :key="index" style="height: max-content;"
                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <a href="#">
                    <img class="rounded-t-lg" :src="'https://image.tmdb.org/t/p/original/' + item.poster_path" alt="" />
                    <strong  class="absolute top-2 right-2 _desc-color rating">{{ item.vote_average.toFixed(2) }} / 10</strong>
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

<script lang="ts" module="es2022" setup>
import { refreshNuxtData, useAsyncData } from 'nuxt/app';
import { onMounted, ref } from 'vue';
const runtimeConfig = useRuntimeConfig();
// const url = `${runtimeConfig.public.apiBase}/3/search/movie?query=blood&include_adult=false&language=en-US&page=1`;    
const { data: results } = await useAsyncData( 
    'results_data',
    () => $fetch(`${runtimeConfig.public.apiBase}/3/trending/movie/day?language=en-US&page=1`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${runtimeConfig.public.accessAuthToken}`
        },
    }),
)

const refresh = () => refreshNuxtData("results_data");

var movie_list = results.value.results
console.log(movie_list)
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${runtimeConfig.public.accessAuthToken}`
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => {
//     results = json.results;
//     console.log(results)
//   })
//   .catch(err => console.error('error:' + err));


</script>

<style lang="scss" scoped>
._desc-color{
    color: rgb(233 207 112);
}

.rating{
    background-color: rgb(13, 17, 32);
    padding: 2px 5px;
    border-radius: 5px;
}
</style>