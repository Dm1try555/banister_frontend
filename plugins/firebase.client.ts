// ============================================================================
// Firebase Plugin
// ============================================================================

import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported } from 'firebase/messaging'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  
  // Initialize Firebase Messaging if supported
  let messaging = null
  if (await isSupported()) {
    messaging = getMessaging(app)
  }

  return {
    provide: {
      firebase: app,
      messaging
    }
  }
})