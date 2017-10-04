import { MidiService } from './midi.service';
import { MidiConnection } from './midi-connection.class';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { ServerService } from './server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  serverAddress = '';

  clientsColor = 'none';

  connections: string[] = [];
  webSocket: Subject<any>;

  midiConnection: MidiConnection;

  /** 
  *    create melody array with MIDI messages:
  *
  * 
  *              MIDI Channel Voice Message Specification
  * 
  * 
  *         Status Byte        Data Byte I        Data Byte II
  *        ______|______      ______|______      ______|______    
  *       /             \    /             \    /             \ 
  *
  *       1 0 0 1 0 0 0 0    0 0 1 1 1 1 0 0    0 1 0 1 1 0 1 0 
  * 
  *       \_____/ \_____/    \_____________/    \_____________/
  *          |       |              |                  |
  *       Note On  MIDI       Note #60 (C3)       Velocity 90
  *                Ch. 1
  * 
  *       The same as Uint8Array =>  [144, 60, 90]
  */  

  melody = [
    [144, 69,  90], [144, 72,  79], [144, 69,  82], [144, 69,  95],
    [144, 74,  90], [144, 69,  95], [144, 67,  95], [144, 69, 106], 
    [144, 76,  90], [144, 69, 106], [144, 69, 106], [144, 77,  95],
    [144, 76,  82], [144, 72,  79], [144, 69,  82], [144, 76,  79],  
    [144, 81,  63], [144, 76,  82], [144, 69,  79], [144, 69,  90],  
    [144, 67,  86], [144, 64,  82], [144, 72,  79], [144, 69,  95],
    [144, 69, 101], [144, 69, 101], [144, 69,  95], [144, 67, 101], 
    [144, 64,  95], [144, 62, 106]
  ];
  melodyCounter = 0;

  constructor(
    private serverService: ServerService,
    private websocketService: WebsocketService,
    private midiService: MidiService
  ) {

  }
  
  /* called when application/component gets initialized */
  ngOnInit() {

    /* Display Server URL if this app instance is run by electron app */
    if (this.serverService.isServer()) {
      this.serverAddress = this.serverService.getOwnIp() + ':4200';
    }

    /* use the URL for websockets */
    this.connectToServer();

    /* get the MIDI connection instance from MidiService */
    this.midiService.getMidiConnection()
    .then(connection => {
      this.midiConnection = connection;

      /* route Input to output (danger! Can create MIDI feedback loops!) */
      this.midiConnection.subscribe(message => {
        this.midiConnection.sendAll(message);
      });

});
    
    

  }

  connectToServer(): void {
    
    /* Connect to the webSocket server that has the same IP as the current http server.
        The returning connection is an RxJs Subject that can be subscribed to. */
    this.webSocket = this.websocketService.connect(`${location.hostname}:8080`);
    
    /* Get Data and parse from JSON */
    this.webSocket.map(msg => JSON.parse(msg.data))
  
      /* Process the incoming data */
      .subscribe(data => {
  
        console.log('Websocket In: ', data);
  
        /* display number of connected clients */
        if (data.connections) {
          this.connections = data.connections;
        }

        /* do stuff with events */
        if (data.noteEvent) {
          this.flashClients();
        }

        if (data.noteEvent === 'nextNote' && this.serverService.isServer()) {
          /* 
            TODO for more stable multidevice melody playing: 
            Let server handle melody position and just give notes to clients
          */
          this.playNote();
        }
      });
  }

  /* set the connection name */
  setName(name) {
    this.webSocket.next({setName: name});
  }

  /* sent a noteEvent via webSocket to server */
  pushTheButton(): void {
    this.webSocket.next({noteEvent: 'nextNote'});
  }

  /* Makes the 'Clients' indicator flash (Maybe do with observables and async?)*/
  private flashClients(): void {
    
    this.clientsColor = 'warn';
    setTimeout(() => {
      this.clientsColor = 'none';
    }, 150);
  }

  /* Play a note of the melody */
  private playNote(): void {
    /* get note from melody array */
    const note = this.melody[this.melodyCounter];

    /* play the note */
    this.midiConnection.sendAll(note);

    /* Note off after 150ms */
    setTimeout(() => {
      this.midiConnection.sendAll([note[0], note[1], 0]);
    }, 150);

    /* go to next note */
    this.melodyCounter = ++this.melodyCounter % (this.melody.length);
  }
}
