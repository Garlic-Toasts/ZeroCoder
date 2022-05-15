const { Titlebar, Menu } = require("custom-electron-titlebar")


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    const { version } = require('../../../package.json')
    document.getElementById('version').innerHTML = version

    // const titlebar = new Titlebar({
    //     maximizable: false,
    //     icon: __dirname + "./logo.png",
    //     backgroundColor: "#3b3e42",
    //     svgColor: "#FFFFFF",
    //     iconSize: 23
    // });

})
