export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    'usebootstrap',
  ],
  
  css: [
    '~/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  app: {
    head: {
      title: 'BANISTER - Trusted Home Staff',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Hire vetted domestic professionals and manage your household with ease - long term.' 
        }
      ],
      link: [
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
          as: 'style'
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },

  icon: {
    size: '24px',
    class: '',
    aliases: {
      'search': 'heroicons:magnifying-glass',
      'chat': 'heroicons:chat-bubble-left-right',
      'globe': 'heroicons:globe-alt',
      'user': 'heroicons:user',
      'arrow': 'heroicons:arrow-right'
    }
  },

  build: {
    transpile: ['bootstrap']
  },

  nitro: {
    preset: 'netlify'
  },

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '/api'
    }
  }
});
