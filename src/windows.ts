const { app, BrowserWindow, Menu, nativeTheme, shell, ipcMain, dialog} = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main')
const path = require('path')

setupTitlebar();
const createWindowProjects = () => {
	const projectsWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.resolve(__dirname, "../../images/appLogo.png"),
		center: true,
		title: "ZeroCoder | Projects",
		resizable: false,
		backgroundColor: "#323335",
		frame: false,
		fullscreenable: false,
		maximizable: false,
		webPreferences: {
			preload: path.resolve(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	projectsWindow.loadFile("./src/projects/window.html");
	attachTitlebarToWindow(projectsWindow);
	nativeTheme.themeSource = "dark";
	return projectsWindow;
};

const createWindowEditor = (paths: any) => {
	const editorWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		icon: path.resolve(__dirname, "../../images/appLogo.png"),
		center: true,
		title: " - ZeroCoder | Editor",
		resizable: false,
		backgroundColor: "#323335",
		frame: false,
		fullscreenable: false,
		maximizable: false,
		webPreferences: {
			preload: path.resolve(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	editorWindow.loadFile("./src/editor/window.html");
	attachTitlebarToWindow(editorWindow);
	nativeTheme.themeSource = "dark";
};

app.whenReady().then(() => {
	createWindowProjects();
});

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("select-project-dialog", function (event: any) {
	console.log("!");
	dialog.showOpenDialog({
		title: "Select a project",
		properties: ["openFile"],
		filters: [{ name: "ZeroCoder Blueprint", extensions: ["bprint"] }],
		buttonLabel: "Select",
		defaultPath: "/Users/<username>/Documents/",
	}).then(result => {
		if (!result.canceled) {
			createWindowEditor(result.filePaths);
			//projectsWindow.close();
		}
	  }), function (file: File) {
		if (file) {
			event.sender.send("selectedItem", file);
		}
	}
});

ipcMain.on("help-context-menu", (event: any) => {
	const templateMenu: Electron.MenuItemConstructorOptions[] = [
		{
			label: "Documentation",
			click: () => {
				shell.openExternal("https://github.com/N3wSk1Y/ZeroCoder");
			},
		},
		{
			label: "About",
			click: () => {
				event.sender.send("event-context-menu-click", "About");
			},
		},
		{
			type: "separator",
		},
		{
			label: "Report bug",
			click: () => {
				shell.openExternal("https://github.com/N3wSk1Y/ZeroCoder/issues");
			},
		},
		{
			label: "Request feature",
			click: () => {
				shell.openExternal("https://github.com/N3wSk1Y/ZeroCoder/pulls");
			},
		},
	];
	const menu = Menu.buildFromTemplate(templateMenu);
	menu.popup();
});

ipcMain.on("settings-context-menu", (event: any) => {
	const templateMenu = [
		{
			label: "Settings",
			click: () => { },
		},
	];
	const menu = Menu.buildFromTemplate(templateMenu);
	menu.popup();
});
