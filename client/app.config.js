import * as dotenv from 'dotenv'

// initialize dotenv
dotenv.config()

export default ({ config }) => ({
  ...config,
  icon: process.env.APP_ICON || '.assets/icon.png',
  name: process.env.APP_NAME || 'My App',
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_PLACES_API_KEY,
      },
    },
    permissions: [
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_BACKGROUND_LOCATION',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_LOCATION',
    ],
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.myApp',
    runtimeVersion: '1.0.0',
  },
})
