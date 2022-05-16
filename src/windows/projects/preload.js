const { Titlebar, Menu } = require("custom-electron-titlebar")
const fs = require('fs')
const p = require('path')

const dir = 'C:\\Users\\Дмитрий\\ZeroCoderProjects' // TOEDIT

function getProjects(dir, projects) {
    projects = projects || [];
    var allFiles = fs.readdirSync(dir);
    for (var i = 0; i < allFiles.length; i++){
        var path = dir + '/' + allFiles[i];
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

    const { version } = require('../../../package.json')
    document.getElementById('version').innerHTML = version

    console.log(getProjects(dir))

    // const titlebar = new Titlebar({
    //     maximizable: false,
    //     icon: __dirname + "./logo.png",
    //     backgroundColor: "#3b3e42",
    //     svgColor: "#FFFFFF",
    //     iconSize: 23
    // });

})
