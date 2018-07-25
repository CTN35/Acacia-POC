import { GlobalMessageService } from './global-message.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MyHttpInterceptor {
  constructor(private msgService: GlobalMessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

    // Clone the request to add the new header.
    const authReq = req.clone(this.getHttpOptions(req.headers));

    console.log('Sending request with new header now ...');

    // send the newly created request
    return next.handle(authReq).pipe(
      catchError((error, caught) => {
        // intercept the response error and display it to the console
        console.log('Error Occurred');
        console.log(error);
        // return the error to the method that called it
        this.msgService.sendMessage('loginFail', {});
        return throwError(error);
      }) as any);

  }

  private getHttpOptions(reqHeaders: HttpHeaders): Object {

    reqHeaders.set('accept', 'application/json');
    if (reqHeaders.get('Authorization') === undefined || reqHeaders.get('Authorization') === null
      || reqHeaders.get('Authorization') === '') {
      reqHeaders.set('Authorization', 'Basic ' + btoa('Wololo:Sqwalala'));
    }

    const options = {
      headers: reqHeaders,
      responseType: 'json',
      withCredentials: false
    };

    return options;
  }
}

