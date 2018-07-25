import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {

  private subject = new Subject<any>();
  constructor() { }

  sendMessage(type: string, data: any) {
    this.subject.next({ type: type, data: data });
}

clearMessage() {
    this.subject.next();
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}

}
