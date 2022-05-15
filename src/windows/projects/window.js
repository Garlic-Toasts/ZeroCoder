const { app, BrowserWindow } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + './logo.png',
        center: true,
        title: "ZeroCoder | Projects",
        resizable: false,
        backgroundColor: "#323335",
        frame: true,
        webPreferences: {
            preload: __dirname + '/preload.js'
        },
        // titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#323335',
            symbolColor: '#cccccc'
        },

    })

    win.loadFile(__dirname + '/window.html')
}

app.whenReady().then(() => {
    createWindow()  
})  



