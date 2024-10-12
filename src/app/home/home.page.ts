import { Component } from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  constructor(private authService:KeycloakService) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
    }
  }

  public async onLogin() {
    await this.authService.login();
  }

  public async onLogout() {
    await this.authService.logout();
  }

  getName() {
    return `${this.userProfile?.lastName} ${this.userProfile?.firstName}`;
  }
}
