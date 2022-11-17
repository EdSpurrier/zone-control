import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
const { ipcMain } = require('electron')
import { TitanCore } from 'titan-core'
import { console, core } from './system/globals'




global.titanCore = new TitanCore();

console.logError("Titan Console");


let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    x: 0,
    y:0,
    width: 1200,
    height: 1200,
    maxHeight: 1500,
    maxWidth: 2000,
    minHeight: 1000,
    minWidth: 1000,
    title: "Zone Control",
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:8080`);
  } else {
    mainWindow.loadURL(
      url.format({
          pathname: path.join(__dirname, '../html/index.html'),
          protocol: 'file:',
          slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//write this below the app.whenReady() function in the main.js file

ipcMain.on('anything-asynchronous', (event, arg) => {
  // gets triggered by the async button defined in the App component
  //console.log("async",arg) // prints "async ping"

  console.log("async",arg);
  event.reply('asynchronous-reply', 'pong')
})

// gets triggered by the sync button defined in the App component
ipcMain.on('anything-synchronous', (event, arg) => {
  console.log("sync",arg) // prints "sync ping"
})


app.whenReady().then(() => {
  createWindow();




});

ipcMain.on('get-display-info', (event, arg) => {
  const displays = screen.getAllDisplays()
  const display = displays.find((d) => d.bounds.x !== 0 || d.bounds.y !== 0) || displays[0];
  console.log("Gathering Display Info => Total = ", displays.length);
  event.reply('display-info', displays);
})






ipcMain.on('get-windows-info', (event, arg) => {


  //GetWindow();
})

//app.on('ready', createWindow);
//app.allowRendererProcessReuse = true;




  