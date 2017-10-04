import { MidiService } from './midi.service';
import { ServerService } from './server.service';
import { ElectronService } from 'ngx-electron';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ElectronService,
    ServerService,
    WebsocketService,
    MidiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
