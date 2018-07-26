import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {

    private subject = new ReplaySubject<any>(1);
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
