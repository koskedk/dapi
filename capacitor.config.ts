import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ke.co.livesync.dapi',
  appName: 'dapi',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    hostname:"dapi.livesync.co.ke",
  },
};

export default config;
