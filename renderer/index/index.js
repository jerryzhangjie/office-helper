const { ipcRenderer: ipc } = require('electron')

const { $ } = require('../public/util')

window.onload = function() {
    // 事件绑定
    bindEvent()
    const taskList = []
    taskList.push({
        title: '周会',
        address: '五楼氖',
        time: '2020/08/04 9:43'
    })
    taskList.push({
        title: '需求评审',
        address: '六楼GG',
        time: '2020/08/04 9:42'
    })
    
    let liList = ''
    taskList.forEach((task) => {
        liList += `<li class="task">
            <p>事项：${task.title}</p>
            <p>地点：${task.address}</p>
            <span>时间：${task.time}</span>
        </li>`
    })
    $('#task_list').innerHTML = liList

    // 消息提醒
    var cbkNotify = notify(taskList)
    setInterval(cbkNotify, 5000)
}

// 闭包实现可传参
function notify(taskList) {
    return function() {     // 这是实际想传给setTimeout的函数
        let now = new Date()
        let nowTimestamp = parseInt(now.getTime() / (1000 * 60))        // 具体到“分”的时间戳
        taskList.forEach((task) => {
            let title = task.title
            let address = task.address 
            let time = task.time
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
        ipc.send('close')
    })
    // 添加
    $('#add_task').addEventListener('click', () => {
        ipc.send('add')
    })
}