import { AuthUser } from './Model';
import { ModelService } from './model.service';
import { GlobalMessageService } from './global-message.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MyHttpInterceptor {
  constructor(private msgService: GlobalMessageService, private model: ModelService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header.
    const authReq = req.clone(this.getHttpOptions(req.headers));

    // send the newly created request
    return next.handle(authReq).pipe(
      catchError((error, caught) => {
        // return the error to the method that called it
        this.model.user.isAuthenticated = false;
        this.model.user.password = '';
        this.model.loginError = true;
        this.msgService.sendMessage('loginFail', {});
        return throwError(error);
      }) as any);
  }

  private getHttpOptions(reqHeaders: HttpHeaders): Object {
    let header = reqHeaders;
    if (header.get('Authorization') === null) {
        header = header.set('Accept', 'application/json');
        const user: AuthUser = this.model.user;
        header = header.set('Authorization', 'Basic ' + btoa(user.login + ':' + user.password));
    }

    const options = {
      headers: header,
      responseType: 'json',
      withCredentials: false
    };

    return options;
  }
}

