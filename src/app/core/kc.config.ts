import {KeycloakInitOptions} from 'keycloak-js';
import {environment} from '../../environments/environment';

export function getKeycloakInitOptions(): KeycloakInitOptions {
  const redirectUri = environment.production
    ? 'dapi://dapi.livesync.co.ke/callback'
    : 'http://localhost:8100/callback';
  return {
    //onLoad: 'login-required',
    checkLoginIframe: true,
    enableLogging: true, //!environment.production,
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    flow: 'implicit',
    redirectUri: redirectUri,
    adapter: 'cordova',
  };
}
