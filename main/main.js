const electron = require('electron')
const client = require('electron-connect').client
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
let appTray = null  // 托盘

app.on('ready', () => {
    const mainWin = createWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true   // 允许渲染进程使用node接口
        },
        show: false,                // 加载完成前不显示窗口
        backgroundColor: '#2e2c29', // 加载完成前用背景色填充窗口
        frame: false,  
    }, 'renderer/index/index.html')
    
    // 最小化
    ipc.on('minimize', () => {
        mainWin.minimize()
    })
    // 关闭
    ipc.on('close', () => {
        mainWin.hide()
        setTray(mainWin)
    })
    // 添加
    ipc.on('add', () => {
        const addWin = createWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true   // 允许渲染进程使用node接口
            },
            show: false,                // 加载完成前不显示窗口
            // backgroundColor: '#2e2c29', // 加载完成前用背景色填充窗口
            frame: false,  
        }, 'renderer/addTask/index.html')

        // 添加
        ipc.on('addTask', () => {
            addWin.minimize()
        })
        // 取消
        ipc.on('cancel', () => {
            addWin.hide()
        })
    })
})

// 创建浏览器窗口
function createWindow(options, page) {
    const win = new BrowserWindow(options)
    win.loadFile(page)
    win.once('ready-to-show', () => {
        win.show()
    })

    // 打开控制台
    // win.webContents.openDevTools()

    // 热更新
    client.create(win)
    return win
}

// 关闭时放入系统托盘
function setTray(mainWin) {
    const Menu = electron.Menu
    const Tray = electron.Tray
    // 鼠标右键菜单
    let trayMenuTemplate = [{
        label: '退出',
        click: function() { 
            app.quit()
        }
    }]
    let iconPath = path.join(__dirname, 'app.ico')
    appTray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // 隐藏主窗口
    mainWin.hide()
    // 设置托盘悬浮提示
    appTray.setToolTip('never forget')
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu)
    // 点击托盘小图标显示应用
    appTray.on('click', function() {
        // 显示主程序
        mainWin.show()
        // 关闭托盘显示
        appTray.destroy()
    })
}
