import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import {extractPathFromUrl, getUrlParameter} from './core/utils';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {getKeycloakInitOptions} from './core/kc.config';
import {KeycloakAngularCapacitorService} from './keycloak-angular-capacitor/keycloak-angular-capacitor.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private zone: NgZone,
    public platform: Platform,
    //private keycloak: KeycloakService,
    private kc: KeycloakAngularCapacitorService,) {
    this.initApp()
  }

  initApp(){
    console.log('app initialized!');
    this.kc.init();
    this.platform.ready().then(() => {
      console.log('Platform is ready');
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          console.log('URL>>>', event.url);
          const appPath = extractPathFromUrl(event.url);
          console.log('path:::', appPath);
          const code=getUrlParameter('code',event.url);
          console.log('code::: ', code);
          if (appPath?.includes('callback')) {
            console.log('nav >>> ', appPath);

            if (code) {
              this.kc.login({ code }).then(() => {
                console.log("Login successful");
                this.router.navigate(['/callback']);
              }).catch(error => {
                console.error("Login failed", error);
              });
            }
          }
        });
      }).then(() => {
        console.log('Listener for appUrlOpen added successfully.');
      })
        .catch((error) => {
          console.error('Error adding listener for appUrlOpen:', error);
        });
    })
  }

  initializeApp() {
    console.log('app initialized!');
    this.platform.ready().then(() => {
      console.log('Platform is ready');
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          console.log('URL>>>', event.url);
          const appPath = extractPathFromUrl(event.url);
          console.log('path:::', appPath);
          const code=getUrlParameter('code',event.url);
          console.log('code::: ', code);
          const tk=getUrlParameter('token',event.url);
          console.log('tk::: ', code);
          if (appPath?.includes('callback')) {
            console.log('nav >>> ', appPath);
            // this.keycloak.loadUserProfile();
            this.router.navigate(['/callback']);
          }
        });
      }).then(() => {
        console.log('Listener for appUrlOpen added successfully.');
      })
        .catch((error) => {
          console.error('Error adding listener for appUrlOpen:', error);
        });
    })
  }
}
