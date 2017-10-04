/**
 *  Comments are from official electron quickstart guide
 *  https://electron.atom.io/docs/tutorial/quick-start/#write-your-first-electron-app
 */

const {app, BrowserWindow} = require('electron');

/**
 *  
 *                          Server / Client relationships
 *     
 *         ___________________________________________________________
 *        /                                                           \
 *        |                      Electron Framework                   |
 *        |       _________________              _________________    |
 *        |      /                 \            /                 \   |
 *        |      |                 |            |                 |   |
 *        |      |     Node.js     |            |     Chromium    |   |
 *      <----OS----->              |            |                 |   |
 *        |      |               <--- Internal---->            <----User-->
 *        |      |   Main Process  |  Comm.     |                 |   |
 *      <--Network-->              |            |     Renderer    |   |
 *        |      |   ┌────────────────┐         |     Process     |   |
 *        |      |   │ Server         ├─serves────→               |   |
 *        |      \___│ HTTP/WebSocket │         \_________________/   |
 *        |          └──┬─────────────┘                               |
 *        \_____________│_____________________________________________/
 *                serves│ 
 *         _____________│___
 *        /             ↓   \
 *        |  Browser        |
 *        |  on devices     |
 *        \_________________/
 *          
 *     
 */

/* http server to serve web app */
const httpServer = require('./http-server.js');

const wsServer = require('./ws-server.js');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 600, height: 400, webPreferences: {
    webSecurity: false
  }});
  
  /* serve from internal server */
  win.loadURL('http://localhost:4200');



  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
