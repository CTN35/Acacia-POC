import { AuthUser } from './Model';
import { ModelService } from './model.service';
import { GlobalMessageService } from './global-message.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
        let doThrowError = true;
        let errorMsg = '';

        if (error instanceof HttpErrorResponse) {
          const err = <HttpErrorResponse>error;
          switch (err.status) {
            case 401:
              // Authentication error
              this.model.user.isAuthenticated = false;
              this.model.user.password = '';
              this.model.loginError = true;
              this.msgService.sendMessage('loginFail', {});
              doThrowError = false;
              break;
            case 404:
              errorMsg = 'La ressource demandée n\'a pas été trouvée. L\'utilisateur ne doit pas y avoir accès :\n\n';
              break;
            case 500:
              errorMsg = 'Une erreur est survenue sur le serveur BPM lors de l\'appel à l\'url :\n\n';
              break;
            default:
              errorMsg = 'Une erreur inconnue est survenue (problème de configuration CORS ?) :\n\n';
              break;
          }
          errorMsg += 'Erreur : ' + err.error + '\n';
          errorMsg += 'Statut : ' + err.status + ' | ' + err.statusText + ' | ' + err.name + '\n';
          errorMsg += 'Url : ' + err.url + '\n';
          errorMsg += err.message;
        } else {
          errorMsg = 'Une erreur directement liée à l\'application est survenue :\n\n';
          errorMsg += JSON.stringify(error, null, 2);
        }
        if (doThrowError) {
          this.msgService.sendMessage('GeneralError', errorMsg);
          return throwError(error);
        } else {
          return new Observable();
        }
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

