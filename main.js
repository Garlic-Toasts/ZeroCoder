const { app, BrowserWindow } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

setupTitlebar();
const createWindow = () => {
    const projectsWindow = new BrowserWindow({
        width: 800,
        height: 600,
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

    projectsWindow.loadFile('./src/projects/window.html')
    attachTitlebarToWindow(projectsWindow);
}

app.whenReady().then(() => {
    createWindow()  
})  

app.on('window-all-closed', () => {
    app.quit()
})

ipc.on('select-project-dialog', function (event) {
    dialog.showOpenDialog({
        title: "Select a project",
        properties: ['openFile'],
        filters: [
            { name: 'ZeroCoder Blueprint', extensions: ['bprint'] }
        ],
        buttonLabel: "Select",
        defaultPath: '/Users/<username>/Documents/',
    }, function (file) {
        if (file)
            event.sender.send('selectedItem', file)
    })
})