import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private subject: Subject<MessageEvent>;
  private ws: WebSocket;

  constructor() { }

  /* connect to server (and create socket, if not exists) */
  connect(address): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(address);
    } else {
      this.disconnect();
      this.subject = this.create(address);
    }
    return this.subject;
  }

  /* create socket */
  private create(address): Subject<MessageEvent> {

    this.ws = new WebSocket(`ws://${address}`);

    /* create the observable */
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
        /* 
          assign the observable methods to webSocket callbacks 
          to create an observable from webSocket input. 
        */
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    );

    /* create the observer (call next(data) to send via webSocket ) */
    const observer = {
      next: data => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    /* 
      create Subject from observer and observable.
      Read more about RxJS and Subjects at http://reactivex.io/rxjs/manual/overview.html#subject
    */ 
    return Subject.create(observer, observable);
  }
  
  /* disconnect and close websocket connection */
  disconnect() {
    if (this.subject) {
      this.ws.close();
    }
  }
}
