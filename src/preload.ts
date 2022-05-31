import { Titlebar, Color } from "custom-electron-titlebar"
import { version } from '../package.json'
import { v4 as uuidv4 } from 'uuid'
import { ipcRenderer } from "electron"
import gradient from 'random-gradient'
import fs from 'fs'
import p from 'path'
const dir = "C:/Users/Дмитрий/ZeroCoderProjects"// TOEDIT
require("./projects/front.js")


const colors_1 = ["#14877F", "#772982", "#4BAF3B", "#ECA345", "#D5784D"]
const colors_2 = ["#075852", "#31216D", "#226318", "#E47E3C", "#D64E3E"]
const colors_3 = ["#CECECE", "#CECECE", "#CECECE", "#000000", "#000000"]

// console.log(gradient(uuidv4(), "radial"))

type projectsList = project[] | []

interface project {
    name: string,
    path: string
}

const uppers = function (pName: any) {
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
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    document.getElementById('version').innerHTML = version

    // Buttons >>
    const openButton = document.getElementById('open');
    openButton.addEventListener('click', function (event) {
        ipcRenderer.send('select-project-dialog')
    })
    const helpButton = document.getElementById('help');
    helpButton.addEventListener('click', function (event) {
        ipcRenderer.send('help-context-menu')
    })
    const settingsButton = document.getElementById('settings');
    settingsButton.addEventListener('click', function (event) {
        ipcRenderer.send('settings-context-menu')
    })

    if (fs.existsSync(dir)) {
        var projectsList: projectsList = getProjects(dir)
    } else {
        var projectsList: projectsList = []
    }

    var list = document.getElementById('list')
    for (var i = 0; i < projectsList.length; i++) {
        let element = document.createElement('li');
        element.innerText = projectsList[i].name
        let t = '<input type="radio" value="' + projectsList[i].path + 'id="' + i + '_radio"name="radio-list"onClick="openProject()"'
        if (i === 0) {
            t += "hover"
        }
        t += '><label for="' + i + '_radio"><p class="p-name">' + projectsList[i].name + '</p><p class="p-path">' + projectsList[i].path + '</p></label>'
        let randomNumber = Math.floor(Math.random() * 5)
        t += '<div class="minicon" style="background: linear-gradient(120deg,' + colors_1[randomNumber] + ',' + colors_2[randomNumber] + ');"><p style="color:' + colors_3[randomNumber] + '">'
            + uppers(projectsList[i].name) + '</p></div>'
        element.innerHTML = t
        element.className = "project"
        list.appendChild(element)
    }

    const titlebar = new Titlebar({
        icon: "../../images/appLogo.png",
        backgroundColor: Color.fromHex("#3b3e42"),
        svgColor: Color.fromHex("#ffffff"),
        iconSize: 23,
        menu: null,
        maximizable: false
    });

})

function getProjects(dir: string, projects?: project[]): project[] {
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
