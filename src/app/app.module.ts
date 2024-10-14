import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {authInitializer} from "./core/auth.init.factory";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),KeycloakAngularModule, AppRoutingModule],
  providers: [
    { provide: APP_INITIALIZER, useFactory: authInitializer, multi: true, deps: [KeycloakService]},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
