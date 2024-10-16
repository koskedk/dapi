import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import {getKeycloakInitOptions} from './kc.config';

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
        console.error('Failed to initialize Keycloak authentication: ',error);
      });


}
