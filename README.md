## 关于 Electron
1. Electron 是由Github开发（目前由Github上的一支团队及贡献者维护），用HTML、CSS和JS来构建跨平台桌面应用程序的一个开源库。通过将Chromium和node.js合并到同一个运行环境，然后打包为Mac、Win、Linux系统下的应用程序。
2. Electron 可看作是node.js的变体，这个变体专注于桌面应用而非web服务器，所以它允许你使用纯js直接调用丰富的原生(操作系统)APIs来创建桌面应用。因此，Electron 应用程序本质上是一个 node.js 应用程序。
3. Electron 也可看作是一个被 JS 控制的精简版的 Chromium 浏览器，它使用 web 页面作为它的图形用户界面(GUI)。
4. 为了保持Electron的小巧，只用了Chromium的渲染库而不是全部组件，这使得升级Chromium更容易，但也意味着Electron缺少了Google Chrome里的一些浏览器相关的特性。

## 开发环境
node.js + npm + IDE

## 应用架构 - 主进程和渲染进程
> 进程：一个正在被执行或运行的计算机程序。
Electron 基于 Chromium，而 Chromium 的设计理念是多进行的，直白来说，以 chrome 浏览器为例，每个 tab 页面都是一个独立的进程，称为“渲染进程(Renderer Process)”，此外还有一个负责管理所有渲染进程的“主进程(Main Process)”。这样设计的好处是，当某个 tab 出现问题时，不会影响其它 tab。
* 主进程 - Main Process
  - 只有一个，作为程序的主入口
  - 可以使用与系统对接的 Electron API - 创建菜单、上传文件 等等
  - 创建 渲染进程 - Renderer Process，创建 web 页面展示 GUI
  - 全面支持 Node.js
* 渲染进程 - Renderer Process
  - 可以有多个，每个对应一个窗口 - web 页面
  - 每个都是一个单独的进程
  - 全面支持 node.js 和 DOM API
  - 可以使用一部分 Electron 提供的 API


[1. 配置热更新](https://www.jianshu.com/p/7d8dc34187f1#2electron-%E7%83%AD%E6%9B%B4%E6%96%B0)
2. 设置拖动后，点击事件失效怎么办？https://blog.csdn.net/GISuuser/article/details/86685510  可拖动元素-webkit-app-region: drag; 而不可拖动元素设为 no-drag
3. 关闭时放入系统托盘 https://www.zhuyuntao.cn/electron%E5%AE%9E%E7%8E%B0%E6%9C%80%E5%B0%8F%E5%8C%96%E5%88%B0%E6%89%98%E7%9B%98