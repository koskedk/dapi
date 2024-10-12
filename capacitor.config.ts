import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ke.co.livesync.dapi',
  appName: 'dapi',
  webDir: 'www',
  server: {
    androidScheme: 'app',        // For Android (app://localhost)
    iosScheme: 'capacitor',      // For iOS (capacitor://localhost)
  },
};

export default config;
