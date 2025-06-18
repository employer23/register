@echo off
echo 正在部署表单修复v2到GitHub...

echo.
echo 1. 添加所有文件到Git...
git add .

echo.
echo 2. 提交更改...
git commit -m "修复404错误和管理员页面问题 v2

修复内容：
- 在HTML表单中添加隐藏的form-name字段
- 修复admin-script.js的API连接错误，改为本地存储
- 添加Netlify警告提示，指导用户使用admin-netlify.html
- 创建_redirects文件支持Netlify Forms
- 创建simple-test.html最简表单测试页面
- 移除JavaScript中重复的form-name设置
- 完善所有表单的配置和测试工具"

echo.
echo 3. 推送到GitHub...
git push origin main

echo.
echo ✅ 部署完成！
echo.
echo 测试步骤：
echo 1. 等待Netlify部署完成（1-3分钟）
echo 2. 先测试: https://你的域名/simple-test.html （最简表单）
echo 3. 再测试: https://你的域名/form-test.html （JavaScript表单）
echo 4. 最后测试: https://你的域名/index.html （主报名表单）
echo.
pause
