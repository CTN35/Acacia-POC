import { Observable } from 'rxjs';
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
    const reqObservable = this.httpClient.get(environment.bpm_base_url + 'readycheck', this.GetLoginHttpOptions(user));
    reqObservable.subscribe(x => {
      console.log('Login Success');
      user.isAuthenticated = true;
      // transfer user to main
      this.msgService.sendMessage('login', user);
    });
  }

  getProcesses(active: boolean = true): Observable<any> {
    const reqObservable = this.httpClient.get(
      environment.bpm_base_url + 'containers/' + environment.bpm_container + '/processes/instances');
    return reqObservable;
  }

  startNewProcess(params: any): Observable<any> {
    const reqObservable = this.httpClient.post(
      environment.bpm_base_url + 'containers/' + environment.bpm_container + '/processes/' + environment.bpm_process_id + '/instances'
      , params);
    return reqObservable;
  }

  getTasks(procInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.get(environment.bpm_base_url + 'queries/tasks/instances/process/' + procInstanceId);
    return reqObservable;
  }

  getTaskInfos(taskInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.get(environment.bpm_base_url + 'queries/tasks/instances/' + taskInstanceId);
    return reqObservable;
  }

  startTask(taskInstanceId: number, params: any): Observable<any> {
    const reqObservable = this.httpClient.put(
      environment.bpm_base_url + 'containers/' + environment.bpm_container + '/tasks/' + taskInstanceId + '/states/started'
      , params);
    return reqObservable;
  }

  completeTask(taskInstanceId: number, params: any): Observable<any> {
    const reqObservable = this.httpClient.put(
      environment.bpm_base_url + 'containers/' + environment.bpm_container + '/tasks/' + taskInstanceId + '/states/completed'
      , params);
      return reqObservable;
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
