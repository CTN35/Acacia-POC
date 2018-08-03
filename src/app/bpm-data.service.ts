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
    const reqObservable = this.httpClient.get(environment.bpmBaseUrl + 'readycheck', this.GetLoginHttpOptions(user));
    reqObservable.subscribe(x => {
      user.isAuthenticated = true;
      // transfer user to main
      this.msgService.sendMessage('login', user);
    });
  }

  getProcesses(active: boolean = true): Observable<any> {
    const reqObservable = this.httpClient.get(
      environment.bpmBaseUrl + 'containers/' + environment.bpmContainer +
      '/processes/instances?page=0&pageSize=10');
    return reqObservable;
  }

  getProcessVariables(procInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.get(
      environment.bpmBaseUrl + 'containers/' + environment.bpmContainer + '/processes/instances/' + procInstanceId + '/variables');
    return reqObservable;
  }

  startNewProcess(processId: string, params: any): Observable<any> {
    const reqObservable = this.httpClient.post(
      environment.bpmBaseUrl + 'containers/' + environment.bpmContainer + '/processes/' + processId + '/instances'
      , params);
    return reqObservable;
  }

  getTasks(procInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.get(environment.bpmBaseUrl + 'queries/tasks/instances/process/' + procInstanceId);
    return reqObservable;
  }

  getTaskInfos(taskInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.get(environment.bpmBaseUrl + 'queries/tasks/instances/' + taskInstanceId);
    return reqObservable;
  }

  completeTask(taskInstanceId: number, params: any): Observable<any> {
    const reqObservable = this.httpClient.put(
      environment.bpmBaseUrl + 'containers/' + environment.bpmContainer +
      '/tasks/' + taskInstanceId + '/states/completed?auto-progress=true', params);
    return reqObservable;
  }

  cancelProcess(procInstanceId: number): Observable<any> {
    const reqObservable = this.httpClient.delete(
      environment.bpmBaseUrl + 'containers/' + environment.bpmContainer + '/processes/instances/' + procInstanceId);
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
