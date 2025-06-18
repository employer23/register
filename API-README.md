# 报名系统API部署说明

## 本地运行
1. 安装依赖：`npm install`
2. 启动服务：`npm start`
3. 访问健康检查：`http://localhost:3000/api/health`

## 详细部署步骤

### 第一步：上传代码到GitHub
1. 访问 https://github.com/ 并登录
2. 点击右上角 "+" 号，选择 "New repository"
3. 仓库名称填写：`registration-api`
4. 设为 Public（公开）
5. 点击 "Create repository"
6. 在你的电脑上，打开命令行，进入 `f:\test\register` 文件夹
7. 执行以下命令：
   ```bash
   git init
   git add .
   git commit -m "初始提交：报名系统API"
   git branch -M main
   git remote add origin https://github.com/你的用户名/registration-api.git
   git push -u origin main
   ```

### 第二步：部署到Railway（推荐）
1. 访问 https://railway.app/
2. 点击右上角 "Login" 用GitHub账号登录
3. 登录后点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 找到刚才创建的 `registration-api` 仓库，点击 "Deploy"
6. Railway会自动：
   - 检测到package.json
   - 安装Node.js依赖
   - 启动API服务
7. 部署完成后，点击项目，在 "Deployments" 标签页找到你的API地址
8. 测试：访问 `你的API地址/api/health` 应该显示数据库连接成功

## 部署到Vercel
1. 访问 https://vercel.com/
2. 登录后点击 "New Project"
3. 导入GitHub仓库
4. 设置构建命令：`npm install`
5. 设置启动命令：`node server.js`
6. 部署完成后获得API地址

## 部署到Render
1. 访问 https://render.com/
2. 创建新的Web Service
3. 连接GitHub仓库
4. 设置运行环境为Node.js
5. 启动命令：`npm start`

### 第三步：更新前端API地址
部署成功后，需要将前端代码中的API地址更新为真实地址：

1. 复制Railway给你的API地址（类似：`https://registration-api-production-xxxx.up.railway.app`）
2. 编辑 `script.js` 文件，找到第50行左右，将：
   ```js
   fetch('https://你的API地址/api/registrations', {
   ```
   改为：
   ```js
   fetch('https://你的真实API地址/api/registrations', {
   ```

3. 编辑 `admin-script.js` 文件，找到第5行，将：
   ```js
   const API_BASE = 'https://你的API地址/api';
   ```
   改为：
   ```js
   const API_BASE = 'https://你的真实API地址/api';
   ```

### 第四步：重新部署前端到Netlify
1. 修改完API地址后，访问 https://app.netlify.com/
2. 进入你的项目（kexie1）
3. 拖拽更新后的文件到Netlify，或使用Git自动部署
4. 等待部署完成

### 第五步：测试完整功能
1. 访问报名页面：https://kexie1.netlify.app/
2. 填写一条测试报名
3. 访问管理员页面：https://kexie1.netlify.app/admin
4. 查看是否能看到刚才的报名数据

### 如果没有安装Git
如果你的电脑没有安装Git，可以：
1. 下载安装：https://git-scm.com/download/win
2. 或者使用GitHub Desktop：https://desktop.github.com/
3. 或者直接在GitHub网页上传文件：
   - 在GitHub仓库页面点击 "uploading an existing file"
   - 拖拽所有文件（server.js, package.json等）
   - 提交更改

## API接口说明
- GET `/api/health` - 健康检查
- GET `/api/registrations` - 获取所有报名
- POST `/api/registrations` - 新增报名
- DELETE `/api/registrations/:id` - 删除单个报名
- DELETE `/api/registrations` - 批量删除报名
- DELETE `/api/registrations/all` - 清空所有数据
- GET `/api/stats` - 获取统计数据

## 前端配置
部署完成后，请将前端代码中的API地址替换为实际部署地址。
