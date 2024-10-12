import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {App} from "@capacitor/app";
import {Platform} from "@ionic/angular";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private platform: Platform,private router:Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupDeepLinkListener();
    });
  }

  setupDeepLinkListener() {
    App.addListener('appUrlOpen', (data: any) => {
      console.log('App opened with URL:', data.url);
      if (data && data.url) {
        // Parse the URL and navigate or handle accordingly
        const url = data.url;
        console.log('Handling deep link:', url);

        if (url.startsWith('dapi://localhost')) {
          const path = url.split('localhost')[1];
          // Use Angular Router to navigate within the app
          console.log('Navigating to:', path);
          this.router.navigate(['home']);
        }
      }
    });
  }

  ngOnInit() {
    // Ensure the listener is active after initialization
    this.setupDeepLinkListener();
  }
}
