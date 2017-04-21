const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let win;

app.on('ready', () => {
  console.log('app ready', process.versions);
  win = new BrowserWindow({width: 1024, height: 768});
  console.log('attaching debugger');
  win.webContents.debugger.attach('1.1');
  console.log('debugger attached');

  win.webContents.debugger.on('message', (event, method, params) => {
    console.log('got debugger message');
    if (method === 'Network.loadingFinished') {
      console.log('Loading finished: ', params.requestId);
      win.webContents.debugger.sendCommand('Network.getResponseBody', {
        requestId: params.requestId,
      }, (e, result) => {
        console.log('Got body: ', params.requestId, result);
      });
    }
  });

  win.webContents.debugger.sendCommand('Network.enable');

  win.loadURL('https://gist.githubusercontent.com/domderen/8898d9c5443ae6a492e484f7b437f5ab/raw/74117bcfe7133d2c98ce9ad56de6fdb88bd74048/file.txt');
});
