# 报名页面

一个现代化的活动报名表单，支持个人和小队报名，使用 Netlify Forms 自动收集数据。

## 功能特点

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 表单验证，确保数据完整性
- ✅ 条件显示小队信息
- ✅ 现代化UI设计
- ✅ 提交成功反馈
- ✅ Netlify Forms 自动收集数据
- ✅ 防垃圾邮件保护

## 报名信息

### 基础信息
- 姓名
- 号码
- 学校
- 年级

### 报名形式
- **个人报名**：直接填写基础信息即可
- **小队报名**：需要额外填写
  - 小队名称
  - 小队人数（2-12人）

## 数据管理

### 查看报名数据
1. 访问 [Netlify 后台](https://app.netlify.com/)
2. 进入你的项目（kexie1）
3. 点击侧边栏的 "Forms" 查看所有提交

### 导出数据
1. 在 Forms 页面选择表单
2. 点击 "Export submissions"
3. 下载 CSV 文件，可用 Excel 打开

### 管理员页面
- 访问 `admin-netlify.html` 查看详细使用指南
- 包含完整的数据管理步骤说明

## 部署到 Netlify

### 方法一：拖拽部署（推荐）
1. 打开 [Netlify](https://app.netlify.com/)
2. 将整个 `register` 文件夹拖拽到 Netlify 的部署区域
3. 等待部署完成
4. 表单会自动启用 Netlify Forms 功能

### 方法二：Git 部署
1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中连接 GitHub 仓库
3. 设置构建配置：
   - Build command: 留空
   - Publish directory: `.`
4. 部署后自动启用 Forms 功能

## 故障排除

### 常见问题

#### 1. 表单提交出现404错误
**原因**：
- 网站未部署到Netlify或在本地环境测试
- 表单配置不正确

**解决方案**：
- 确保网站已部署到Netlify（Netlify Forms只在线上环境工作）
- 检查表单是否包含 `data-netlify="true"` 和 `name` 属性
- 访问 `troubleshoot.html` 页面进行详细诊断

#### 2. 提交成功但数据没有显示
**原因**：
- form-name参数不匹配
- Netlify尚未识别表单

**解决方案**：
- 重新部署网站
- 确保表单name属性与JavaScript中的form-name一致
- 等待几分钟让Netlify处理表单

#### 3. 网络连接错误
**解决方案**：
- 检查网络连接
- 刷新页面重试
- 尝试不同浏览器

### 调试工具
- 访问 `form-test.html` - 简化版测试表单
- 访问 `troubleshoot.html` - 完整故障排除指南
- 访问 `data-status.html` - 数据状态检查

## 文件结构

```
register/
├── index.html          # 主报名页面
├── style.css          # 样式文件
├── script.js          # 交互逻辑
├── admin.html         # 本地管理页面
├── admin-script.js    # 管理页面脚本
├── admin-style.css    # 管理页面样式
├── admin-netlify.html # Netlify管理指南
├── data-status.html   # 数据状态检查
├── form-test.html     # 表单测试页面
├── troubleshoot.html  # 故障排除页面
├── netlify.toml       # Netlify配置
├── README.md          # 说明文档
├── DEPLOY-GUIDE.md    # 部署指南
└── GITHUB-DEPLOY.md   # GitHub自动部署指南
```

## 技术栈

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Inter)

## 浏览器兼容性

支持所有现代浏览器：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 自定义

可以根据需要修改：
- 颜色主题（在 `style.css` 中修改 CSS 变量）
- 年级选项（在 `index.html` 中修改 select 选项）
- 小队人数上限（当前设置为12人）
- 表单字段（添加或删除输入项）
