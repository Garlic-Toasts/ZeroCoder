const { app, BrowserWindow } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main")

setupTitlebar();
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1520,
        height: 6080,
        icon: __dirname + './icon.ico',
        title: "ZeroCoder | Editor",
        frame: false,
        backgroundColor: "#323335",
        webPreferences: {
            preload: __dirname + '/preload.js'
        },
    })

    win.loadFile(__dirname + '/window.html')
    attachTitlebarToWindow(win);
}

app.whenReady().then(() => {
    createWindow()  
})  


