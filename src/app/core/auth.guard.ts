import {Injectable} from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {KeycloakService, KeycloakAuthGuard} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected keycloakService: KeycloakService,
    // protected messageService:MessageService
  ) {
    super(router, keycloakService);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let permission;
      if (!this.authenticated) {
        this.keycloakService.login().catch((e) => console.error(e));
        return reject(new Error('Not Authenticated'));
      }

      const requiredRoles: string[] = route.data['roles'];
      if (!requiredRoles || requiredRoles.length === 0) {
        permission = true;
      } else {
        if (requiredRoles.every((role) => this.roles.indexOf(role) > -1)) {
          permission = true;
        } else {
          // this.messageService.add({
          //   key: 'noticeboard',
          //   severity: 'error',
          //   summary: 'Access denied !',
          // });
          permission = false;
        }
        ;
      }
      if (!permission) {
        this.router.navigate(['/']);
      }
      resolve(permission)
    });
  }
}
