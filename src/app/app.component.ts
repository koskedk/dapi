import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {App, URLOpenListenerEvent} from "@capacitor/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        const url = event.url;
        if (url && url.includes('/callback')) {
            this.router.navigate(['/callback']);
        }
    });
  }
}
