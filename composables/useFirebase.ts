// ============================================================================
// Firebase Composable
// ============================================================================

import { ref, onMounted, onUnmounted } from 'vue'
// Firebase imports will be handled by the plugin
import { useAuthApi } from './useAuthApi'
import { useStorage } from './useStorage'

// Get Firebase configuration from runtime config
const config = useRuntimeConfig()
const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId
}

export function useFirebase() {
  const { getItem } = useStorage()
  const { registerFCMToken, unregisterFCMToken } = useAuthApi()
  
  const messaging = ref(null)
  const fcmToken = ref(null)
  const isSupported = ref(false)
  const isInitialized = ref(false)
  const permission = ref('default')

  /**
   * Initialize Firebase
   */
  const initializeFirebase = async () => {
    try {
      // Check if Firebase is supported
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Firebase messaging is not supported in this browser')
        return false
      }

      // Get Firebase from plugin
      const { $firebase, $messaging } = useNuxtApp()
      if (!$firebase || !$messaging) {
        console.warn('Firebase not available from plugin')
        return false
      }

      messaging.value = $messaging as any
      isSupported.value = true
      isInitialized.value = true

      console.log('Firebase initialized successfully')
      return true
    } catch (error) {
      console.error('Error initializing Firebase:', error)
      return false
    }
  }

  /**
   * Request notification permission
   */
  const requestPermission = async () => {
    try {
      if (!isSupported.value) {
        throw new Error('Firebase messaging is not supported')
      }

      const permissionResult = await Notification.requestPermission()
      permission.value = permissionResult

      if (permissionResult === 'granted') {
        console.log('Notification permission granted')
        return true
      } else {
        console.log('Notification permission denied')
        return false
      }
    } catch (error) {
      console.error('Error requesting permission:', error)
      return false
    }
  }

  /**
   * Get FCM token
   */
  const getFCMToken = async () => {
    try {
      if (!messaging.value) {
        throw new Error('Firebase messaging not initialized')
      }

      // Use Firebase messaging from plugin
      const { $messaging } = useNuxtApp()
      if (!$messaging) {
        throw new Error('Firebase messaging not available')
      }
      
      // Get token using the messaging instance
      const token = await ($messaging as any).getToken({
        vapidKey: config.public.firebaseVapidKey
      })

      if (token) {
        fcmToken.value = token
        console.log('FCM token obtained:', token)
        return token
      } else {
        console.log('No registration token available')
        return null
      }
    } catch (error) {
      console.error('Error getting FCM token:', error)
      return null
    }
  }

  /**
   * Register FCM token with backend
   */
  const registerToken = async () => {
    try {
      const token = await getFCMToken()
      if (!token) {
        throw new Error('No FCM token available')
      }

      const accessToken = getItem('access_token')
      if (!accessToken) {
        throw new Error('No access token available')
      }

      await registerFCMToken({
        token: token,
        device_type: 'web'
      })

      console.log('FCM token registered successfully')
      return true
    } catch (error) {
      console.error('Error registering FCM token:', error)
      return false
    }
  }

  /**
   * Unregister FCM token
   */
  const unregisterToken = async () => {
    try {
      if (!fcmToken.value) {
        return true
      }

      await unregisterFCMToken({
        token: fcmToken.value
      })

      fcmToken.value = null
      console.log('FCM token unregistered successfully')
      return true
    } catch (error) {
      console.error('Error unregistering FCM token:', error)
      return false
    }
  }

  /**
   * Setup message listener
   */
  const setupMessageListener = async () => {
    if (!messaging.value) {
      return
    }

    try {
      // Use Firebase messaging from plugin
      const { $messaging } = useNuxtApp()
      if (!$messaging) {
        console.warn('Firebase messaging not available for message listener')
        return
      }
      
      // Set up message listener
      ($messaging as any).onMessage((payload: any) => {
        console.log('Message received:', payload)
        
        // Handle foreground messages
        if (payload.notification) {
          // Show custom notification or update UI
          showCustomNotification(payload.notification)
        }
      })
    } catch (error) {
      console.error('Error setting up message listener:', error)
    }
  }

  /**
   * Show custom notification
   */
  const showCustomNotification = (notification: any) => {
    if (Notification.permission === 'granted') {
      const notificationOptions = {
        body: notification.body,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'firebase-notification',
        requireInteraction: true
      }

      const notif = new Notification(notification.title, notificationOptions)
      
      notif.onclick = () => {
        window.focus()
        notif.close()
      }
    }
  }

  /**
   * Initialize Firebase messaging
   */
  const initializeMessaging = async () => {
    try {
      const initialized = await initializeFirebase()
      if (!initialized) {
        return false
      }

      const hasPermission = await requestPermission()
      if (!hasPermission) {
        return false
      }

      await setupMessageListener()
      
      // Register token if user is authenticated
      const accessToken = getItem('access_token')
      if (accessToken) {
        await registerToken()
      }

      return true
    } catch (error) {
      console.error('Error initializing messaging:', error)
      return false
    }
  }

  /**
   * Cleanup
   */
  const cleanup = async () => {
    try {
      await unregisterToken()
    } catch (error) {
      console.error('Error during cleanup:', error)
    }
  }

  // Lifecycle
  onMounted(() => {
    initializeMessaging()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    // State
    fcmToken: readonly(fcmToken),
    isSupported: readonly(isSupported),
    isInitialized: readonly(isInitialized),
    permission: readonly(permission),
    
    // Methods
    initializeFirebase,
    requestPermission,
    getFCMToken,
    registerToken,
    unregisterToken,
    initializeMessaging,
    cleanup
  }
}