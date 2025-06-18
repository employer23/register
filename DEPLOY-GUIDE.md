# 快速部署指南

## 🚀 5分钟快速部署

### 1. 准备GitHub仓库
- 访问 https://github.com/new
- 仓库名：`registration-api`
- 设为Public
- 点击"Create repository"

### 2. 上传文件到GitHub
**方法A：网页上传（简单）**
1. 在新建的仓库页面，点击"uploading an existing file"
2. 拖拽以下文件到页面：
   - `server.js`
   - `package.json` 
   - `API-README.md`
3. 在底部输入提交信息："Add API files"
4. 点击"Commit changes"

**方法B：Git命令（需要安装Git）**
```bash
cd f:\test\register
git init
git add server.js package.json API-README.md
git commit -m "Add API files"
git branch -M main
git remote add origin https://github.com/你的用户名/registration-api.git
git push -u origin main
```

### 3. 部署到Railway
1. 打开 https://railway.app/
2. 用GitHub账号登录
3. 点击"New Project" → "Deploy from GitHub repo"
4. 选择`registration-api`仓库
5. 点击"Deploy"
6. 等待3-5分钟完成部署
7. 点击项目 → "Deployments" → 复制API地址

### 4. 更新前端
用你的API地址替换前端代码中的占位符：
- `script.js` 第50行
- `admin-script.js` 第5行

### 5. 重新部署前端
将更新后的前端文件重新上传到Netlify。

## ❓ 常见问题

**Q: 没有GitHub账号怎么办？**
A: 免费注册：https://github.com/join

**Q: 没有安装Git怎么办？**  
A: 使用方法A网页上传，或下载GitHub Desktop

**Q: Railway部署失败？**
A: 检查package.json是否正确，或尝试Vercel/Render

**Q: API连接数据库失败？**
A: 检查数据库地址、用户名、密码是否正确
