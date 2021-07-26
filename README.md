# 传统写法
    1. 绑定事件处理函数 - 数据
        1. 增加项 - 列表数据 -> 增加一项
            { id timestamp, content string, completed: false }
           每一项的视图 -> 列表
        2. 删除项 - 列表数据 -> id -> removeItem
           将对应项的视图 -> 列表 -> 删除
        3. 改变完成的状态 - 列表数据 -> id -> change completed
           将对应项的完成状态 -> 是否完成 toggle
# 面向对象、类的继承、横向切割程序 - 设计方案
    1. 程序进行分类
        外层: 浏览器的事件 -> 调用的方法 -> 事件处理函数的绑定
        操作数据: addTodo、removeTodo、toggleComplete
        操作DOM: addItem、removeItem、changeCompleted
        管理模板: todoView -> 接受参数
# 项目启动
## 安装依赖
    npm install
## 启动前端服务
    npm run dev
## 启动后端服务
    npm run server
