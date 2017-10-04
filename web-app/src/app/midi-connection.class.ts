import { Subject } from 'rxjs/Rx';

/* 
  create a class -> because we are not savages

  Class extends an subject. Maybe don't do this at home.
*/

export class MidiConnection extends Subject<WebMidi.MIDIMessageEvent> {

  private inputPorts: WebMidi.MIDIInput[] = [];
  private outputPorts: WebMidi.MIDIOutput[] = [];

  constructor(private midiAccess: WebMidi.MIDIAccess) {
    super();
    this.mapInputsAndOutputs();
    this.subscribeToInputs();
  }

  /* Iterates over Map of inputs and overloads the onmidimessage method for each. */
  private subscribeToInputs(): void {
    const inputs = this.midiAccess.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = (event: any) => {


        console.log('MIDI-In: ', event.data);
        this.onMessage(event.data);

      };
    }
  }

  private onMessage(event): void {
    this.next(event);
  }

  /* Iterates over Map of outputs and calls send(message) of each. */
  public sendAll(message) {
    console.log('MIDI-Out: ', message);
    this.outputPorts.forEach(output => {
      this.midiAccess.outputs.get(output.id).send(message);
    });
  }

  private mapInputsAndOutputs(): void {
    this.midiAccess.inputs.forEach(port => {
      this.inputPorts.push(port);
    });
    this.midiAccess.outputs.forEach(port => {
      this.outputPorts.push(port);
    });

    console.log(this.inputPorts);
    console.log(this.outputPorts);
  }

}
