<template>
    <div>
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
            type="button"
            class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                </path>
            </svg>
        </button>
        <aside id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar" style="width:4.5rem;">
            <div id="nav-bg" class="h-full px-3 py-4 overflow-y-auto">
                <ul class="flex flex-col font-medium h-[calc(100%-1rem)] justify-evenly space-y-2">
                    <li class="text-center">
                        <NuxtLink to="/">
                            <button class="rounded-full border-b-2 border-yellow-300">
                                <Icon class="w-full nav-icons" style="height: 24px; width: 30px;" name="ph:house"
                                    color="white" />
                                <span class="_nav-text">Home</span>
                            </button>
                        </NuxtLink>
                    </li>
                    <!-- <li class="text-center">
                        <button class="rounded-full border-b-2 border-yellow-300">
                            <Icon class="w-full nav-icons" style="height: 24px; width: 30px;" name="ph:flame"
                                color="white" />
                            <span class="_nav-text">What's Hot</span>
                        </button>
                    </li>
                    <li class="text-center">
                        <button class="rounded-full border-b-2 border-yellow-300">
                            <Icon class="w-full nav-icons" style="height: 24px; width: 30px;" name="ph:trend-up"
                                color="white" />
                            <span class="_nav-text">Trending</span>
                        </button>
                    </li> -->
                    <li class="text-center"> 
                        <button data-modal-target="custom-modal" data-modal-toggle="custom-modal"
                            class="rounded-full border-b-2 border-yellow-300">
                            <Icon class="w-full nav-icons" style="height: 24px; width: 30px;" name="ph:magnifying-glass"
                                color="white" />
                            <span class="_nav-text">Search</span>

                        </button> 
                    </li>
                </ul>
            </div>
        </aside>
        <div id="custom-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                
                <input type="text" v-model="text_search" @keyup.enter="searchMovie"
                    class="bg-gray-50 block border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-500 focus:ring-blue-500 left-5 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                    placeholder="Search a movie" />
                    <p id="helper-text-explanation" class="mt-2 text-sm font-bold text-white">Press enter to search.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const page = ref(1);
const props = defineProps<{
    movieList: {}[],
}>();

const text_search = ref("");

const runtimeConfig = useRuntimeConfig();
const model = computed({
    get: () => { props.movieList },
    set: (newVal) => {
        return newVal
    }
})
const results = ref(await useAsyncData(
    'search_results',
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

const searchMovie =() => {
    return navigateTo({
    path: '/posts/',
    query: {
        title: text_search.value
    }
  })
}

const refresh = () => refreshNuxtData("results_data");   
</script>

<style lang="scss" scoped>
._search-movie {
    width: 15rem;
}

#nav-bg {
    background-color: rgb(13 17 32);
}

._nav-icons {
    height: 24px;
    width: 30px;
}

._nav-text {
    position: absolute;
    margin-top: 4px;
    background-color: rgb(13 17 32);
    text-wrap: nowrap;
    border-radius: 6px;
    padding: 2px 5px;
    color: rgb(233 207 112);
    left: 110%;
    opacity: 0;
    transition: opacity 0.15s ease, transform 0.15s ease;
    transform-origin: left;
    --scale: 0;
}

ul li button:hover span {
    opacity: 1;
    --scale: 1;
}

ul li button {
    transition: 0.15s ease;
}

ul li button:hover,
ul li button:focus,
ul li button:active {
    background-color: rgb(180, 156, 70);
    color: rgb(13 17 32);
}
</style>