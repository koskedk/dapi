import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {KeycloakAngularCapacitorService} from '../keycloak-angular-capacitor/keycloak-angular-capacitor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public userProfile: KeycloakProfile | null = null;

  constructor(private authService: KeycloakAngularCapacitorService) {
  }

  async ngOnInit(): Promise<void> {
      this.userProfile = await this.authService.loadUserProfile();
  }

  public async onLogout() {
    await this.authService.logout();
  }

  getName() {
    return `${this.userProfile?.lastName} ${this.userProfile?.firstName}`;
  }
}
