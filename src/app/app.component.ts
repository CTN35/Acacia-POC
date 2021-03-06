import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { GlobalMessageService } from './global-message.service';
import { AuthUser } from './Model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  subscription: Subscription;
  errorMsg = '';
  showError = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private msgService: GlobalMessageService,
    private router: Router,
    public model: ModelService) { }

  ngOnInit() {
    this.subscription = this.msgService.getMessage().subscribe(message => { this.handleMessage(message); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleMessage(message: any): void {

    switch (message['type']) {
      case 'login':
        this.model.user = message['data'];
        this.model.loginError = false;
        this.router.navigate(['/bridge']);
        break;
      case 'loginFail':
        this.model.user = message['data'];
        this.model.user.password = '';
        this.model.user.isAuthenticated = false;
        this.router.navigate(['/login']);
        break;
      case 'GeneralError':
        this.router.navigate(['/']);
        this.errorMsg = 'Veuillez contacter l\'administrateur';
        console.error('ERROR Acacia : ');
        console.error(message['data']);
        this.showError = true;
        break;
      default:
        break;
    }
  }

  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }

  logout() {
    this.model.resetModel(true);
    this.model.selectedOffer = null;
    this.router.navigate(['/']);
  }

}
