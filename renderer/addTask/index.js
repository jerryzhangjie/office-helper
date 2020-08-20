const { ipcRenderer: ipc } = require('electron')
const { $ } = require('../public/util')
const fs = require('fs')
let taskList = []
window.onload = function() {
    fs.readFile('dataBase.txt', function (err, data) {
        if (err) {
            return console.error(err)
        }
        data = data.toString()
        if (data) {
            console.log(data)
            taskList = JSON.parse(data)
        }
    })
    // 事件绑定
    bindEvent()
}

function bindEvent() {
    $('#add').addEventListener('click', () => {
        const title = $('#task').value
        const address = $('#address').value
        const date = $('#date').value
        const time = $('#time').value
        const fullTime = `${date} ${time}`
        let task = {
            title,
            address,
            fullTime
        }
        taskList.push(task)
        taskList = JSON.stringify(taskList)
        fs.writeFile('dataBase.txt', taskList, function(err){
            //如果err=null，表示文件使用成功，否则，表示希尔文件失败
            if(err) {
                console.log('写文件出错了，错误是：'+err);
            } else {
                console.log('ok');
            }
            ipc.send('update-data')
            ipc.send('addTask')
        })    
    })
    $('#cancel').addEventListener('click', () => {
        ipc.send('cancel')
    })
}