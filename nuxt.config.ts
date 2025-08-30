export default defineNuxtConfig({
  compatibilityDate: '2025-08-30',
  modules: [
    '@nuxt/icon',
    'usebootstrap',
  ],
  
  css: [
    '~/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  // Development settings for hot reload
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  // Vite settings for faster hot reload
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  },

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

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api/v1',
      firebaseApiKey: process.env.FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.FIREBASE_APP_ID || '',
      firebaseVapidKey: process.env.FIREBASE_VAPID_KEY || ''
    }
  },

  // CORS configuration for development
  nitro: {
    preset: 'netlify',
    devProxy: {
      '/api/': {
        target: 'http://localhost:8000/api/',
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
});
