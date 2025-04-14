//electron js

//imports needed electron modules
const  {app, BrowserWindow} = require('electron'); // app -> lifecycle of application, browserwindow creates and manages windows
const path = require('path'); // handles file paths
const isDec = require('electron-is-dev'); //checks if dev mode or not
const { default: isDev } = require('electron-is-dev');

let mainWindow; // references to main app window

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })


    // determines what url to load up
    // in dev -> local host
    // prod -> html file
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`;


    mainWindow.loadURL(startURL); //loads url

    // event listener for when the window is closed
    mainWindow.on('closed', () => (mainWindow = null));
}

// called when electron initalises for creation of browser window
app.on('ready', createWindow);

// quits the app once all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { // darwin specifices macos
        app.quit();
    }
})

// recreates a window when the dock icon is clicked and there are no open windows
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})