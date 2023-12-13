// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000'
    }
  },
  head: {
    title: "MOVIE DATABASE",
    
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js'
      }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
      }
    ]
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    'nuxt-icon'
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    accessAuthToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmRjNGM0YjBmZmQ5NzczN2M1YThiNDViZDY5MzQyYyIsInN1YiI6IjY1Nzg0Njc0MjBlY2FmMDExZGI2MGU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xHKDy7Yg0u0fKhTIFuv9i74V-1P-CpUtqza4qBTjg18',
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'https://api.themoviedb.org',  
      accessAuthToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmRjNGM0YjBmZmQ5NzczN2M1YThiNDViZDY5MzQyYyIsInN1YiI6IjY1Nzg0Njc0MjBlY2FmMDExZGI2MGU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xHKDy7Yg0u0fKhTIFuv9i74V-1P-CpUtqza4qBTjg18'
    }
  }
})
