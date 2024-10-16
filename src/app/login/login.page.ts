import { Component, OnInit } from '@angular/core';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakAngularCapacitorService} from '../keycloak-angular-capacitor/keycloak-angular-capacitor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  constructor(private authService: KeycloakAngularCapacitorService) {
  }

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.authService.loadUserProfile();
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
