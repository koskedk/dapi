import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {authInitializer} from "./core/auth.init.factory";
import {KeycloakAngularCapacitorModule} from './keycloak-angular-capacitor/keycloak-angular-capacitor.module';
import {KEYCLOAK_CONFIG} from './keycloak-angular-capacitor/keycloak.tokens';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), KeycloakAngularCapacitorModule, AppRoutingModule],
  providers: [
    {
      provide: KEYCLOAK_CONFIG,
      useValue: {
        url: environment.authUrl,
        realm: environment.authRealm,
        clientId: environment.authClientId,
        redirectUri: environment.redirectUri,
        redirectUriWeb: environment.redirectUri,
      }
    },
    // {provide: APP_INITIALIZER, useFactory: authInitializer, multi: true, deps: [KeycloakService]},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
