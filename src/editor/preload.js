const { Titlebar } = require("custom-electron-titlebar")


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
  
    new Titlebar({
        icon: __dirname + "./icon.svg",
        backgroundColor: "#3b3e42",
        svgColor: "#FFFFFF",
        iconSize: 23
    });

})
