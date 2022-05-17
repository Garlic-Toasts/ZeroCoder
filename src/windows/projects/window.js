const { app, BrowserWindow, Menu } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')

setupTitlebar();
const createWindow = () => {
    const win = new BrowserWindow({
        width: 830,
        height: 630,
        icon: __dirname + './../../../images/icon.ico',
        center: true,
        title: "ZeroCoder | Projects",
        resizable: false,
        backgroundColor: "#323335",
        frame: false,
        fullscreenable: false,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: true
        },
    })

    win.loadFile(__dirname + '/window.html')
    attachTitlebarToWindow(win);
}

app.whenReady().then(() => {
    createWindow()  
})  

app.on('window-all-closed', () => {
    app.quit()
})

