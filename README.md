# 报名页面

一个现代化的活动报名表单，支持个人和小队报名。

## 功能特点

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 表单验证，确保数据完整性
- ✅ 条件显示小队信息
- ✅ 现代化UI设计
- ✅ 提交成功反馈

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

## 部署到 Netlify

### 方法一：拖拽部署
1. 打开 [Netlify](https://app.netlify.com/)
2. 将整个 `register` 文件夹拖拽到 Netlify 的部署区域
3. 等待部署完成

### 方法二：Git 部署
1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中连接 GitHub 仓库
3. 设置构建配置：
   - Build command: 留空
   - Publish directory: `.`

## 文件结构

```
register/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 交互逻辑
├── netlify.toml    # Netlify 配置
└── README.md       # 说明文档
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
