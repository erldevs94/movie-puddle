<template>
  <div class="md:flex flex-row">
    <NavHeader  class="basis-[4%]"/>
    <NuxtPage  class="p-8 w-full" style="background-color:  rgb(19 20 24);"/>
  </div>
</template>
<script lang="ts" setup> 
const appConfig = useAppConfig()

useHead({
  link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
      }
    ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    }
  ]
})
</script> 