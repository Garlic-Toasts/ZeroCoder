const { Titlebar, Menu } = require("custom-electron-titlebar")
const { version } = require('./package.json')
const fs = require('fs')
const p = require('path')
const ipc = require('electron').ipcRenderer

const dir = 'C:\\Users\\Дмитрий\\ZeroCoderProjects' // TOEDIT

const colors_1 = ["#14877F", "#772982", "#4BAF3B", "#ECA345", "#D5784D"]
const colors_2 = ["#075852", "#31216D", "#226318", "#E47E3C", "#D64E3E"]
const colors_3 = ["#CECECE", "#CECECE", "#CECECE", "#000000", "#000000"]

const uppers = function (pName) {
    if (pName.includes(' ')) {
        let parts = pName.split(' ')
        return parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    } else if (pName.includes('-')) {
        let parts = pName.split('-')
        return parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    } else if (pName.includes('_')) {
        let parts = pName.split('_')
        return parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    } else if (/[A-Z]/g.test(pName)) {
        return pName.match(/[A-Z]/g).slice(0, 2).join("")
    } else if (/[0-9]/g.test(pName)) {
        return pName[0].toUpperCase() + pName.match(/[0-9]/g)[0]
    } else {
        return pName[0].toUpperCase()
    }
}
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

    if (fs.existsSync(dir)) {
        var projectsList = getProjects(dir)
    } else {
        var projectsList = []
    }
    var list = document.getElementById('list')
    for (var i = 0; i < projectsList.length; i++) {
        let element = document.createElement('li');
        element.innerText = projectsList[i].name
        t = '<input type="radio" value="' + projectsList[i].path + 'id="' + i + '_radio"name="radio-list"onClick="openProject()"'
        if (i === 0) {
            t += "hover"
        }
        t += '><label for="' + i + '_radio"><p class="p-name">' + projectsList[i].name + '</p><p class="p-path">' + projectsList[i].path + '</p></label>'
        let r = Math.floor(Math.random() * 5)
        t += '<div class="minicon" style="background: linear-gradient(120deg,' + colors_1[r] + ',' + colors_2[r] + ');"><p style="color:' + colors_3[r] + '">'
            + uppers(projectsList[i].name) + '</p></div>'
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
    for (var i = 0; i < allFiles.length; i++) {
        var path = dir + '\\' + allFiles[i];
        if (fs.statSync(path).isDirectory()) {
            getProjects(path, projects);
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