import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ke.co.livesync.dapi',
  appName: 'dapi',
  webDir: 'www',
  server: {
    androidScheme: 'dapi'    // For iOS (capacitor://localhost)
  },
};

export default config;
