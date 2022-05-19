const { Titlebar, Menu } = require("custom-electron-titlebar")
const { version } = require('./package.json')
const fs = require('fs')
const p = require('path')
const ipc = require('electron').ipcRenderer

const dir = 'C:\\Users\\Дмитрий\\ZeroCoderProjects' // TOEDIT

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    document.getElementById('version').innerHTML = version

    // Buttons >>
    const openButton = document.getElementById('open');
    openButton.addEventListener('click', function (event) {
        ipc.send('select-project-dialog')
    })
    
    if (fs.existsSync(dir)){
        var projectsList = getProjects(dir)
    } else {
        var projectsList = []
    }
    var list = document.getElementById('list')
	for (var i = 0; i < projectsList.length; i++) {
		let element = document.createElement('li');
		element.innerText = projectsList[i].name
		t = '<input type="radio" value="'+projectsList[i].path+'id="'+i+'_radio"name="radio-list"onClick="openProject()"'
		if (i === 0) {
			t += "hover"
		}
		t += '><label for="'+i+'_radio"><p class="p-name">'+projectsList[i].name+'</p><p class="p-path">'+projectsList[i].path+'</p></label>'
		element.innerHTML = t
		element.className = "project"
		list.appendChild(element)
    }

    const titlebar = new Titlebar({
        icon: __dirname + "/images/icon.ico",
        backgroundColor: "#3b3e42",
        svgColor: "#FFFFFF",
        iconSize: 23,
        menu: null,
        maximizable: false
    });

})

function getProjects(dir, projects) {
    projects = projects || [];
    var allFiles = fs.readdirSync(dir);
    for (var i = 0; i < allFiles.length; i++){
        var path = dir + '\\' + allFiles[i];
        if (fs.statSync(path).isDirectory()){
            getProjects (path, projects);
        } else {
            if (p.extname(path) == ".bprint") {
                projects.push({
                    name: p.basename(path).slice(0, p.basename(path).indexOf(".")),
                    path: path
                });
            }    
        }
    }
    return projects;
}