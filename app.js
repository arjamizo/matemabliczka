"use strict";

const range = _ => Array(_).map((e,i) => i)

var first = Math.floor(Math.random() * 9) + 1
var second = Math.floor(Math.random() * 9) + 1

const cssPos = (x, y, extra) => {
    let style = ""
    style += "position: absolute; top: " + y + "px; left: " + x + "px;"
    return style + (extra || "");
}

let render = (ans) => {
    const cbxgen = num => {
        return Array.from(Array(10)).map((e,id) => {
            const i = id+1
            let style = cssPos(100, i * 35 + 100, (num == i ? "border: 1px solid red" : ""))
            let attrs = "style = '"+style+"; width: 20px;'"
            let ret = "<input type=text size=1 readonly "+attrs+" value="+i+" />"
            // console.log(ret)
            return ret
        }).join("")
    }
    const checkboxesVertical = cbxgen(first)
    // console.log(checkboxesVertical)
    const checkboxesHorizontal = cbxgen(second).replace(/left|top/g, _ => _ == "top" ? "left" : "TMP").replace(/TMP/g, "top")
    let result = ""
    result += "<input size=1 type=text style='" + cssPos(200, 300) + "' value='" + (first) + "'/>";
    result += "<span style='" + cssPos(200/2+300/2, 300) + "'>*</span>";
    result += "<input size=1 type=text style='" + cssPos(270, 300) + "' value='" + (second) + "'/>";
    result += "<span style='" + cssPos(330, 300) + "'>=</span>";
    var ansEl = (window.document.querySelector('#ret') || {value: 0})
    if(ansEl) {
        let color = "red"
        if((ansEl.value == first * second)) {
            color = "green"
            first = Math.floor(Math.random() * 9) + 1
            second = Math.floor(Math.random() * 9) + 1
            ansEl.value = ''
        }
        ansEl.style.borderColor = color;
        console.log('border to ', ansEl.style.borderColor)
    }
    return checkboxesHorizontal + checkboxesVertical + result
}

function updateDom(appEl) {
    appEl.innerHTML = render((appEl.querySelector('#ret') || {value:0}).value * 1)
    // window.document.querySelector('#ret').focus()
}

var appEl = document.querySelector('#app')
appEl.parentNode.innerHTML += "<input size=1 id='ret' type='text' style='border: 3px black solid;" + cssPos(350, 300) + "' value='" + "" + "'/>";
appEl = document.querySelector('#app')
updateDom(appEl)
window.setInterval(updateDom, 300, appEl)
