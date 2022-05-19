const { Titlebar, Menu } = require("custom-electron-titlebar")
const fs = require('fs')
const p = require('path')

const dir = 'C:\\Users\\Дмитрий\\ZeroCoderProjects' // TOEDIT

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

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    const { version } = require('./package.json')
    document.getElementById('version').innerHTML = version
    
    
    if (fs.existsSync(dir)){
        var projectsList = getProjects(dir)
    } else {
        var projectsList = []
    }
    var list = document.getElementById('list')
	for (var i = 0; i < projectsList.length; i++) {
		let e = document.createElement('li');
		e.innerText = projectsList[i].name
		t = '<input type="radio" value="'+projectsList[i].path+'id="'+i+'_radio"name="radio-list"onClick="openProject()"'
		if (i === 0) {
			t += "hover"
		}
		t += '><label for="'+i+'_radio"><p class="p-name">'+projectsList[i].name+'</p><p class="p-path">'+projectsList[i].path+'</p></label>'
		e.innerHTML = t
		e.className = "project"
		list.appendChild(e)
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