import { Subscription } from 'rxjs';
import { GlobalMessageService } from 'src/app/global-message.service';
import { ModelService } from './../model.service';
import { BpmDataService } from './../bpm-data.service';
import { AuthUser } from './../Model';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AuthUser = {login: '', password: '', isAuthenticated: false};
  credentialError = false;
  loading = false;
  subscription: Subscription = null;


  constructor(private bpmService: BpmDataService, public model: ModelService, private msgService: GlobalMessageService) {
    // this.subscription = this.msgService.getMessage().subscribe(message => { this.handleMessage(message); });
  }

  ngOnInit() {
    this.user = this.model.user;
  }

  doLogin(): void {
    this.bpmService.doLogin(this.user);
  }

  onSubmit(f: NgForm) {
    this.model.loginError = false;
    this.user.login = f.value.login;
    this.user.password = f.value.password;
    this.credentialError = true;
    this.loading = true;
    setTimeout(() => this.doLogin(), 200);
  }
}
