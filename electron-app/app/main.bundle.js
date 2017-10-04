webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host() {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  height: 100vh;\n}\n\n.toolbar-spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.top, .middle, .bottom {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 20px;\n}\n\n.server-info {\n  font-size: 16px;\n}\n\n.name-input {\n  margin-top: 10px;\n  margin-right: 10px;\n  font-size: 16px;\n}\n\n.clients-title {\n  margin-bottom: 10px;\n  color: rgba(255,255,255,.87);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\">\n  <span>LAN Jam App</span>\n  <span class=\"toolbar-spacer\"></span>\n  <span\n    class=\"server-info\" \n    *ngIf=\"serverAddress\"\n    >Connect: <strong>{{serverAddress}}</strong>\n  </span>\n  <md-toolbar-row>\n    <md-form-field class=\"name-input\">\n      <input mdInput type=\"text\" placeholder=\"Your name\" #name>\n    </md-form-field>\n    <button\n      md-raised-button\n      color=\"accent\"\n      selected=\"true\"\n      (click)=\"setName(name.value)\"\n    >Set Name\n    </button>\n  </md-toolbar-row>\n</md-toolbar>\n\n  \n  <div class=\"top\">\n    \n    <span class=\"clients-title\">Jamming buddies in the house:</span>\n    <md-chip-list>\n      <md-chip *ngFor=\"let clientName of connections\"\n        color=\"primary\"\n        selected=\"true\"\n      >{{clientName}}\n      </md-chip>\n    </md-chip-list>\n\n  </div>\n  \n  \n  <div class=\"middle\">\n    \n    <button \n      md-raised-button\n      color=\"primary\"\n      (click)=\"pushTheButton()\"\n    >JAM!</button>\n\n  </div>\n  \n  \n  <div class=\"bottom\">\n    \n    <md-chip\n      [color]=\"clientsColor\"\n      selected=\"true\"\n    >Clients: {{connections.length}}\n    </md-chip>\n\n  </div>\n  \n  "

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__midi_service__ = __webpack_require__("../../../../../src/app/midi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__websocket_service__ = __webpack_require__("../../../../../src/app/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_service__ = __webpack_require__("../../../../../src/app/server.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(serverService, websocketService, midiService) {
        this.serverService = serverService;
        this.websocketService = websocketService;
        this.midiService = midiService;
        this.serverAddress = '';
        this.clientsColor = 'none';
        this.connections = [];
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
        this.melody = [
            [144, 69, 90], [144, 72, 79], [144, 69, 82], [144, 69, 95],
            [144, 74, 90], [144, 69, 95], [144, 67, 95], [144, 69, 106],
            [144, 76, 90], [144, 69, 106], [144, 69, 106], [144, 77, 95],
            [144, 76, 82], [144, 72, 79], [144, 69, 82], [144, 76, 79],
            [144, 81, 63], [144, 76, 82], [144, 69, 79], [144, 69, 90],
            [144, 67, 86], [144, 64, 82], [144, 72, 79], [144, 69, 95],
            [144, 69, 101], [144, 69, 101], [144, 69, 95], [144, 67, 101],
            [144, 64, 95], [144, 62, 106]
        ];
        this.melodyCounter = 0;
    }
    /* called when application/component gets initialized */
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* Display Server URL if this app instance is run by electron app */
        if (this.serverService.isServer()) {
            this.serverAddress = this.serverService.getOwnIp() + ':4200';
        }
        /* use the URL for websockets */
        this.connectToServer();
        /* get the MIDI connection instance from MidiService */
        this.midiService.getMidiConnection()
            .then(function (connection) {
            _this.midiConnection = connection;
            /* route Input to output */
            _this.midiConnection.subscribe(function (message) {
                _this.midiConnection.sendAll(message);
            });
        });
    };
    AppComponent.prototype.connectToServer = function () {
        var _this = this;
        /* Connect to the webSocket server that has the same IP as the current http server.
            The returning connection is an RxJs Subject that can be subscribed to. */
        this.webSocket = this.websocketService.connect(location.hostname + ":8080");
        /* Get Data and parse from JSON */
        this.webSocket.map(function (msg) { return JSON.parse(msg.data); })
            .subscribe(function (data) {
            console.log('Websocket In: ', data);
            /* display number of connected clients */
            if (data.connections) {
                _this.connections = data.connections;
            }
            /* do stuff with events */
            if (data.noteEvent) {
                _this.flashClients();
            }
            if (data.noteEvent === 'nextNote' && _this.serverService.isServer()) {
                /*
                  TODO for more stable multidevice melody playing:
                  Let server handle melody position and just give notes to clients
                */
                _this.playNote();
            }
        });
    };
    /* set the connection name */
    AppComponent.prototype.setName = function (name) {
        this.webSocket.next({ setName: name });
    };
    /* sent a noteEvent via webSocket to server */
    AppComponent.prototype.pushTheButton = function () {
        this.webSocket.next({ noteEvent: 'nextNote' });
    };
    /* Makes the 'Clients' indicator flash (Maybe do with observables and async?)*/
    AppComponent.prototype.flashClients = function () {
        var _this = this;
        this.clientsColor = 'warn';
        setTimeout(function () {
            _this.clientsColor = 'none';
        }, 150);
    };
    /* Play a note of the melody */
    AppComponent.prototype.playNote = function () {
        var _this = this;
        /* get note from melody array */
        var note = this.melody[this.melodyCounter];
        /* play the note */
        this.midiConnection.sendAll(note);
        /* Note off after 150ms */
        setTimeout(function () {
            _this.midiConnection.sendAll([note[0], note[1], 0]);
        }, 150);
        /* go to next note */
        this.melodyCounter = ++this.melodyCounter % (this.melody.length);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__websocket_service__["a" /* WebsocketService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__midi_service__["a" /* MidiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__midi_service__["a" /* MidiService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__midi_service__ = __webpack_require__("../../../../../src/app/midi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_service__ = __webpack_require__("../../../../../src/app/server.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__material_module__ = __webpack_require__("../../../../../src/app/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__websocket_service__ = __webpack_require__("../../../../../src/app/websocket.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_7__material_module__["a" /* MaterialModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2_ngx_electron__["a" /* ElectronService */],
            __WEBPACK_IMPORTED_MODULE_1__server_service__["a" /* ServerService */],
            __WEBPACK_IMPORTED_MODULE_9__websocket_service__["a" /* WebsocketService */],
            __WEBPACK_IMPORTED_MODULE_0__midi_service__["a" /* MidiService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MaterialModule = (function () {
    function MaterialModule() {
    }
    return MaterialModule;
}());
MaterialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdChipsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdInputModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdChipsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdInputModule */]
        ]
    })
], MaterialModule);

//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ "../../../../../src/app/midi-connection.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MidiConnection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/*
  create a class -> because we are not savages

  Class extends an subject. Maybe don't do this at home.
*/
var MidiConnection = (function (_super) {
    __extends(MidiConnection, _super);
    function MidiConnection(midiAccess) {
        var _this = _super.call(this) || this;
        _this.midiAccess = midiAccess;
        _this.inputPorts = [];
        _this.outputPorts = [];
        _this.mapInputsAndOutputs();
        _this.subscribeToInputs();
        return _this;
    }
    /* Iterates over Map of inputs and overloads the onmidimessage method for each. */
    MidiConnection.prototype.subscribeToInputs = function () {
        var _this = this;
        var inputs = this.midiAccess.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = function (event) {
                console.log('MIDI-In: ', event.data);
                _this.onMessage(event.data);
            };
        }
    };
    MidiConnection.prototype.onMessage = function (event) {
        this.next(event);
    };
    /* Iterates over Map of outputs and calls send(message) of each. */
    MidiConnection.prototype.sendAll = function (message) {
        var _this = this;
        console.log('MIDI-Out: ', message);
        this.outputPorts.forEach(function (output) {
            _this.midiAccess.outputs.get(output.id).send(message);
        });
    };
    MidiConnection.prototype.mapInputsAndOutputs = function () {
        var _this = this;
        this.midiAccess.inputs.forEach(function (port) {
            _this.inputPorts.push(port);
        });
        this.midiAccess.outputs.forEach(function (port) {
            _this.outputPorts.push(port);
        });
        console.log(this.inputPorts);
        console.log(this.outputPorts);
    };
    return MidiConnection;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Subject"]));

//# sourceMappingURL=midi-connection.class.js.map

/***/ }),

/***/ "../../../../../src/app/midi.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MidiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__midi_connection_class__ = __webpack_require__("../../../../../src/app/midi-connection.class.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MidiService = (function () {
    function MidiService() {
    }
    MidiService.prototype.getMidiConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            /* Check if browser supports MIDI */
            if (navigator.requestMIDIAccess) {
                var accessOptions = {
                    sysex: false,
                    software: false // <-- request software synth access (need to test)
                };
                /* get the MIDIAccess and create our MidiConnection */
                navigator.requestMIDIAccess(accessOptions)
                    .then(function (midiAccess) {
                    console.log('MIDI Connection established.');
                    _this.midiConnection = new __WEBPACK_IMPORTED_MODULE_1__midi_connection_class__["a" /* MidiConnection */](midiAccess);
                    resolve(_this.midiConnection);
                }, function () {
                    reject('The MIDI system failed to start.');
                });
            }
            else {
                reject('Browser has no MIDI support.');
            }
        });
    };
    return MidiService;
}());
MidiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], MidiService);

//# sourceMappingURL=midi.service.js.map

/***/ }),

/***/ "../../../../../src/app/server.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_electron__ = __webpack_require__("../../../../ngx-electron/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServerService = (function () {
    function ServerService(electronService) {
        this.electronService = electronService;
    }
    /* check if this web app instance is running in electron */
    ServerService.prototype.isServer = function () {
        return this.electronService.isElectronApp;
    };
    ServerService.prototype.getOwnIp = function () {
        if (this.isServer) {
            /* Use electron.remote to access OS information */
            var os = this.electronService.remote.require('os'); // <-- RMI in Java, anyone?
            var ifaces_1 = os.networkInterfaces();
            var ipAddress_1 = '';
            Object.keys(ifaces_1).forEach(function (ifname) {
                ifaces_1[ifname].forEach(function (iface) {
                    if ('IPv4' !== iface.family || iface.internal !== false) {
                        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                        return;
                    }
                    // this interface has only one ipv4 adress
                    ipAddress_1 = iface.address;
                });
            });
            return ipAddress_1;
        }
        else {
            throw (Error('Can not return IP address. This is not an nodejs environment.'));
        }
    };
    return ServerService;
}());
ServerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_electron__["a" /* ElectronService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_electron__["a" /* ElectronService */]) === "function" && _a || Object])
], ServerService);

var _a;
//# sourceMappingURL=server.service.js.map

/***/ }),

/***/ "../../../../../src/app/websocket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WebsocketService = (function () {
    function WebsocketService() {
    }
    /* connect to server (and create socket, if not exists) */
    WebsocketService.prototype.connect = function (address) {
        if (!this.subject) {
            this.subject = this.create(address);
        }
        else {
            this.disconnect();
            this.subject = this.create(address);
        }
        return this.subject;
    };
    /* create socket */
    WebsocketService.prototype.create = function (address) {
        var _this = this;
        this.ws = new WebSocket("ws://" + address);
        /* create the observable */
        var observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (obs) {
            // bind the observable functions to webSocket callbacks to create an observable from webSocket input.
            _this.ws.onmessage = obs.next.bind(obs);
            _this.ws.onerror = obs.error.bind(obs);
            _this.ws.onclose = obs.complete.bind(obs);
            return _this.ws.close.bind(_this.ws);
        });
        /* create the observer (call next(data) to send via webSocket ) */
        var observer = {
            next: function (data) {
                if (_this.ws.readyState === WebSocket.OPEN) {
                    _this.ws.send(JSON.stringify(data));
                }
            }
        };
        /*
          create Subject from observer and observable.
          Read more about RxJS and Subjects at http://reactivex.io/rxjs/manual/overview.html#subject
        */
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"].create(observer, observable);
    };
    /* disconnect and close websocket connection */
    WebsocketService.prototype.disconnect = function () {
        if (this.subject) {
            this.ws.close();
        }
    };
    return WebsocketService;
}());
WebsocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WebsocketService);

//# sourceMappingURL=websocket.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map