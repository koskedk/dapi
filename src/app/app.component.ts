import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import {Platform} from "@ionic/angular";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        // Example url: dapi://localhost/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split("localhost").pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    }).then(() => {
      console.log('Listener for appUrlOpen added successfully.');
    })
      .catch((error) => {
        console.error('Error adding listener for appUrlOpen:', error);
      });;
  }
}
