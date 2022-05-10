const { app, BrowserWindow } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main")

setupTitlebar();
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + './icon.ico',
        center: true,
        title: "ZeroCoder | Projects",
        resizable: false,
        backgroundColor: "#323335",
        frame: false,
        autoHideMenuBar: true,
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


