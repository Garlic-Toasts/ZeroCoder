const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + "/icon.ico",
        center: true,
        title: "ZeroCoder | Projects",
        resizable: false
    })

    win.loadFile('projects.html')
    win.menuBarVisible = false 
}

app.whenReady().then(() => {
    createWindow()  
})  
