# GitHub 自动部署设置指南

## 🚀 设置GitHub自动部署到Netlify

### 📋 前提条件
- ✅ 代码已推送到GitHub仓库：`employer23/register`
- ✅ 有Netlify账户

### 🔧 设置步骤

#### 方法一：新建项目（从零开始）

1. **访问Netlify**
   - 打开 https://app.netlify.com/
   - 用GitHub账号登录

2. **创建新站点**
   - 点击 "New site from Git"
   - 选择 "GitHub"
   - 授权Netlify访问GitHub

3. **选择仓库**
   - 搜索并选择 `employer23/register`
   - 点击仓库名称

4. **配置部署**
   ```
   Branch to deploy: main
   Build command: (留空)
   Publish directory: .
   ```
   - 点击 "Deploy site"

5. **完成**
   - 几分钟后部署完成
   - 获得新的网址（如：amazing-cupcake-abc123.netlify.app）

#### 方法二：现有项目连接GitHub

如果你已经有kexie1.netlify.app项目：

1. **进入项目**
   - 访问 https://app.netlify.com/
   - 点击进入kexie1项目

2. **站点设置**
   - 点击 "Site settings"
   - 左侧菜单选择 "Build & deploy"

3. **连接仓库**
   - 找到 "Continuous Deployment" 部分
   - 点击 "Link site to Git"
   - 选择 "GitHub"
   - 选择 `employer23/register` 仓库

4. **配置设置**
   ```
   Branch: main
   Build command: (留空)
   Publish directory: .
   ```
   - 点击 "Save"

### 🧪 测试自动部署

1. **修改文件测试**
   ```bash
   cd f:\test\register
   echo "# 测试自动部署 - $(date)" >> test.md
   git add .
   git commit -m "测试自动部署功能"
   git push
   ```

2. **查看部署状态**
   - 在Netlify项目页面点击 "Deploys"
   - 看到新的部署正在进行
   - 等待 "Published" 状态

3. **验证更新**
   - 访问你的网站
   - 确认更改已生效

### 📈 自动部署的工作流程

```
本地修改代码 → git commit → git push → 触发Netlify构建 → 自动部署 → 网站更新
```

### ⚙️ 高级配置（可选）

#### 1. 设置部署通知
- 在项目设置中点击 "Build & deploy"
- 添加 "Deploy notifications"
- 可设置邮件、Slack等通知

#### 2. 环境变量
- 在 "Build & deploy" → "Environment variables"
- 添加需要的环境变量

#### 3. 自定义域名
- 在 "Domain settings" 中添加自定义域名
- 配置DNS记录

### 🔍 常见问题

**Q: 推送后没有自动部署？**
A: 检查是否连接了正确的分支（main），查看Deploy日志

**Q: 部署失败？**
A: 查看Deploy日志，通常是文件路径或权限问题

**Q: 想要停止自动部署？**
A: 在Build & deploy设置中可以暂停自动部署

### 📱 移动端管理
- 下载Netlify移动App
- 可以随时查看部署状态
- 移动端管理网站

---

## 🎉 完成！
现在你的报名系统实现了完全自动化：
- 📝 本地修改代码
- 🔄 推送到GitHub
- 🚀 Netlify自动部署
- 🌐 网站自动更新
