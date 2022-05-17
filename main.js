const { app, BrowserWindow, Menu } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')

setupTitlebar();
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 630,
        icon: './images/icon.ico',
        center: true,
        title: "ZeroCoder | Projects",
        resizable: false,
        backgroundColor: "#323335",
        frame: false,
        fullscreenable: false,
        maximizable: false,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: true
        },
    })

    win.loadFile('./src/projects/window.html')
    attachTitlebarToWindow(win);
}

app.whenReady().then(() => {
    createWindow()  
})  

app.on('window-all-closed', () => {
    app.quit()
})

