import { GlobalMessageService } from './global-message.service';
import { environment } from './../environments/environment';
import { AuthUser } from './Model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BpmDataService {

  currentUser: AuthUser = new AuthUser();

  constructor(private httpClient: HttpClient, private msgService: GlobalMessageService) { }

  doLogin(user: AuthUser): void {
    const reqObservable = this.httpClient.get(environment.bpm_base_url + 'healthcheck', this.GetLoginHttpOptions(user));
    reqObservable.subscribe(x => {
      console.log('Login Success');
      user.isAuthenticated = true;
      // transfer user to main
      this.msgService.sendMessage('login', user);
    });
  }

  private GetLoginHttpOptions(user: AuthUser): Object {

    const header = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(user.login + ':' + user.password)
    });

    const options = {
      headers: header,
    };

    return options;
  }
}
