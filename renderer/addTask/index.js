const { ipcRenderer: ipc } = require('electron')

const { $ } = require('../public/util')

window.onload = function() {
    // 事件绑定
    bindEvent()
}

function bindEvent() {
    $('#add').addEventListener('click', () => {
        ipc.send('addTask')
    })
    $('#cancel').addEventListener('click', () => {
        ipc.send('cancel')
    })
}