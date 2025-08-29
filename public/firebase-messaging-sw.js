// ============================================================================
// Firebase Messaging Service Worker
// ============================================================================

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firebase Messaging
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload)
  
  const notificationTitle = payload.notification?.title || 'Новое уведомление'
  const notificationOptions = {
    body: payload.notification?.body || 'У вас новое уведомление',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: payload.data?.notification_id || 'default',
    data: payload.data,
    actions: [
      {
        action: 'view',
        title: 'Просмотреть',
        icon: '/icon-192x192.png'
      },
      {
        action: 'dismiss',
        title: 'Закрыть',
        icon: '/icon-192x192.png'
      }
    ]
  }

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions)
})

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action === 'dismiss') {
    return
  }
  
  // Handle notification data
  const notificationData = event.notification.data
  
  if (notificationData?.notification_id) {
    // Open the app and navigate to notification
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // If app is already open, focus it and navigate
        if (clientList.length > 0) {
          const client = clientList[0]
          client.focus()
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            notificationId: notificationData.notification_id
          })
        } else {
          // Open new window
          clients.openWindow('/notifications')
        }
      })
    )
  } else {
    // Default behavior - open app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event)
})

// Handle push events
self.addEventListener('push', (event) => {
  console.log('Push event received:', event)
  
  if (event.data) {
    const payload = event.data.json()
    console.log('Push payload:', payload)
  }
})