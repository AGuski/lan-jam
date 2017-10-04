# Lan Jam
## CrossEngage Academy #2 - Demo App

**Lan Jam** is a small desktop application that demonstrates how to use *Electron* as a desktop wrapper for an *Angular* WebApplication.
It also demonstrates how to use *WebSocket* technology to allow multi-client interaction in this context and how to use the *Web MIDI API* to interact with connected electronic music instruments.

#### Code it... ####

To take advantage of the dev-server live reload feature of Angular-CLI disable this line in the */electron-app/main.js*:

    const httpServer = require('./http-server.js');

Then ` $ npm start ` from the */web-app* directory  
and ` $ npm start ` from the */electron-app* directory.

Now electron uses the dev-server as http-server and live reload will work.

#### Run it... ####

When the Angular WebApp is finished build it from the */web-app* directory with `$ npm run build:electron`.

and ` $ npm start ` from the */electron-app* directory.

Don't forget to enable the http-server by having this line in the */electron-app/main.js*:

    const httpServer = require('./http-server.js');

Now electron will serve the build WebApp.

#### Build it... ####

To distribute the desktop app as an executable,
run ` $ npm run build ` from the */electron-app* directory.

This will use *electron-packager* to package the app into an executable file, depending on your operating system.

