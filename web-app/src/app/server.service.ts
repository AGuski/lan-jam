import { Injectable } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Injectable()
export class ServerService {

  constructor(private electronService: ElectronService) { }

  /* check if this web app instance is running in electron */
  isServer(): boolean {
    return this.electronService.isElectronApp;
  }

  getOwnIp(): string {
    if (this.isServer) {
      /* Use electron.remote to access OS information */
      const os = this.electronService.remote.require('os'); // <-- RMI in Java, anyone?
      const ifaces = os.networkInterfaces();
      let ipAddress = '';

      Object.keys(ifaces).forEach(ifname => {
        ifaces[ifname].forEach(iface => {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
          // this interface has only one ipv4 adress
          ipAddress = iface.address;
        });
      });
      return ipAddress;
    } else {
        throw(Error('Can not return IP address. This is not an nodejs environment.'));
    }
  }
}
