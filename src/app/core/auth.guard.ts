import { CanActivateFn } from '@angular/router';
import {KeycloakAngularCapacitorService} from '../keycloak-angular-capacitor/keycloak-angular-capacitor.service';
import {inject} from '@angular/core';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakAngularCapacitorService);
  const userProfile = await keycloak.loadUserProfile();
  if (userProfile && userProfile.id) {
    return true;
  }
  return false;
};
