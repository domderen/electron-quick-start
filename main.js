const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, show: false})

  // and load the index.html of the app.
  mainWindow.on('unresponsive', (...args) => console.log('WINDOW UNRESPONSIVE!: ', args))
  mainWindow.loadURL('data:text/html,<!DOCTYPE html><html><body><div>foo</div><script>setTimeout(()=>{for(;;){}},1);</script></body></html>')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)