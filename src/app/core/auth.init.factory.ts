import {KeycloakService} from "keycloak-angular";
import {environment} from '../../environments/environment';
import {KeycloakInitOptions} from "keycloak-js";

function getInitOpts():KeycloakInitOptions {
  let opts: KeycloakInitOptions = {
    enableLogging: true,
    onLoad: 'login-required',
    flow: 'standard',
  };
  if (environment.production) {
    opts.redirectUri = 'app://localhost/callback';
  }
  return opts;
}

export function authInitializer(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.authUrl,
        realm: environment.authRealm,
        clientId: environment.authClientId
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      initOptions: getInitOpts()
    }).then((authenticated) => {
      console.log('Auth is initialized:', authenticated);
    })
      .catch((error) => {
        console.error('Error initializing Auth:', error);
      });
}
