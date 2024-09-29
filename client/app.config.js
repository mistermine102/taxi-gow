import * as dotenv from 'dotenv'

// initialize dotenv
dotenv.config()

export default ({ config }) => ({
  ...config,
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
    package: 'com.anonymous.client',
    runtimeVersion: '1.0.0',
  },
})
