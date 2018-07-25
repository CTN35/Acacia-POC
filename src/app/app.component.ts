import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { GlobalMessageService } from './global-message.service';
import { AuthUser } from './Model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  user: AuthUser = new AuthUser();
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router, private model: ModelService) { }

  ngOnInit() {
    this.subscription = this.msgService.getMessage().subscribe(message => { this.handleMessage(message); });
    this.user = this.model.user;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleMessage(message: any): void {
    switch (message['type']) {
      case 'login':
        this.model.user = message['data'];
        this.user = message['data'];
        this.router.navigate(['/']);
        break;
      case 'loginFail':
        this.model.user = message['data'];
        this.model.user.password = '';
        this.model.user.isAuthenticated = false;
        break;
      default:
        break;
    }
  }

}
