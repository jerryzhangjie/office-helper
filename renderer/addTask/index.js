const { ipcRenderer: ipc } = require('electron')
const { $ } = require('../public/util')
const fs = require('fs')

window.onload = function() {
    // 事件绑定
    bindEvent()
}

function bindEvent() {
    $('#add').addEventListener('click', () => {
        const task = $('#task').value
        const address = $('#address').value
        const date = $('#date').value
        const time = $('#time').value
        const msg = {
            task,
            address,
            date,
            time
        }
        fs.writeFile('../../dataBase.txt', msg, 'utf8', function(err){
            //如果err=null，表示文件使用成功，否则，表示希尔文件失败
            if(err)
                console.log('写文件出错了，错误是：'+err);
            else
                console.log('ok');
        })    
        ipc.send('addTask')
    })
    $('#cancel').addEventListener('click', () => {
        ipc.send('cancel')
    })
}