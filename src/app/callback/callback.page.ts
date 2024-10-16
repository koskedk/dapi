import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {ActivatedRoute, Router} from '@angular/router';
import {KeycloakAngularCapacitorService} from '../keycloak-angular-capacitor/keycloak-angular-capacitor.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(private authService: KeycloakAngularCapacitorService,private router: Router) { }

  ngOnInit(): void {
    let prof=this.authService.loadUserProfile().then((u)=>{
      if(u && u.id){
        this.router.navigateByUrl('/home');
      }
      this.router.navigateByUrl('/login');
    });
    }
}
