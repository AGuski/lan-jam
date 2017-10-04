import { Injectable } from '@angular/core';
import { MidiConnection } from './midi-connection.class';

@Injectable()
export class MidiService {

  midiConnection: MidiConnection;

  getMidiConnection(): Promise<MidiConnection> {
    return new Promise((resolve, reject) => {
      /* Check if browser supports MIDI */
      if (navigator.requestMIDIAccess) {

        const accessOptions = {
          sysex: false, // <-- request sysEx access
          software: false // <-- request software synth access (need to test)
        };

        /* get the MIDIAccess and create our MidiConnection */
        navigator.requestMIDIAccess(accessOptions)
          .then((midiAccess: WebMidi.MIDIAccess) => {
            console.log('MIDI Connection established.');

            this.midiConnection = new MidiConnection(midiAccess);
            resolve(this.midiConnection);
          }, () => {
            reject('The MIDI system failed to start.');
          });
      } else {
        reject('Browser has no MIDI support.');
      }
    });
  }
}
