import { BpmDataService } from './../bpm-data.service';
import { AuthUser } from './../Model';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AuthUser = {login: '', password: '', isAuthenticated: false};

  constructor(private bpmService: BpmDataService) { }

  ngOnInit() {
  }

  doLogin(): void {
    this.bpmService.doLogin(this.user);
  }

}
