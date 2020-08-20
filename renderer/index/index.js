const { ipcRenderer: ipc } = require('electron')
const fs = require('fs')
const { $ } = require('../public/util')

let timer = null

window.onload = function() {
    // 事件绑定
    bindEvent()
    
    // 待办事项展示
    showTask()
}

// 闭包实现可传参
function notify(taskList) {
    return function() {     // 这是实际想传给setTimeout的函数
        let now = new Date()
        let nowTimestamp = parseInt(now.getTime() / (1000 * 60))        // 具体到“分”的时间戳

        taskList.forEach((task) => {
            let title = task.title
            let address = task.address 
            let time = task.fullTime
            let timestamp = (new Date(time)).getTime() / (1000 * 60)    // 具体到“分”的时间戳
            if (timestamp === nowTimestamp) {
                new  window.Notification(title, {
                    body: `记得${time}在${address}进行${title}哦！`
                })
            }
        })
    }
}

function bindEvent() {
    // 最小化
    $('#minimize').addEventListener('click', () => {
        ipc.send('minimize')
    })
    // 关闭
    $('#close').addEventListener('click', () => {
        clearInterval(timer)
        ipc.send('close')
    })
    // 添加
    $('#add_task').addEventListener('click', () => {
        ipc.send('add')
    })
    // 监听数据变化
    ipc.on('update-view', () => {
        showTask()
    })
}

function showTask() {
    let taskList = []
    fs.readFile('dataBase.txt', function(err, data) {
        if (err) {
            return console.error(err)
        }
        data = data.toString()
        if (data) {
            console.log(data)
            taskList = JSON.parse(data)
        }

        // 消息提醒
        let cbkNotify = notify(taskList)
        clearInterval(timer)
        timer = setInterval(cbkNotify, 5000)
    
        let liList = ''
        if (taskList.length) {
            taskList.forEach((task) => {
                liList += `<li class="task">
                    <p>事项：${task.title}</p>
                    <p>地点：${task.address}</p>
                    <p>时间：${task.fullTime}</p>
                </li>`
            })
        } else {
            liList = `<li class="no_data"></li>`
        }
        $('#task_list').innerHTML = liList
    })
}