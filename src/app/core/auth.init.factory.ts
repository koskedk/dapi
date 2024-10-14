import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { KeycloakInitOptions } from 'keycloak-js';

function getKeycloakInitOptions(): KeycloakInitOptions {
  const redirectUri = environment.production
    ? 'https://dapi.livesync.co.ke/callback'
    : 'https://localhost:8100';

  return {
    checkLoginIframe: false,
    enableLogging: !environment.production, // Only enable logging in non-production
    onLoad: 'login-required',
    flow: 'standard',
    redirectUri: redirectUri,
    // adapter: 'cordova',
  };
}

export function authInitializer(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.authUrl,
        realm: environment.authRealm,
        clientId: environment.authClientId,
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      initOptions: getKeycloakInitOptions(),
    })
      .then(authenticated => {
        console.log('Keycloak Authentication Initialized:', authenticated);
      })
      .catch(error => {
        console.error('Failed to initialize Keycloak authentication:', error);
      });
}
