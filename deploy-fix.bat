@echo off
echo 正在部署表单修复到GitHub...

echo.
echo 1. 添加所有文件到Git...
git add .

echo.
echo 2. 提交更改...
git commit -m "修复表单404错误和完善故障排除功能

- 优化Netlify Forms提交逻辑
- 添加详细错误处理和调试信息
- 创建表单测试页面(form-test.html)
- 创建故障排除指南(troubleshoot.html)
- 更新README.md添加故障排除说明
- 在主页面添加调试工具链接
- 支持302重定向状态码处理
- 改进参数编码和传输方式"

echo.
echo 3. 推送到GitHub...
git push origin main

echo.
echo ✅ 部署完成！
echo 等待几分钟后访问Netlify网站测试表单功能。
echo.
echo 调试工具：
echo - 故障排除: https://你的域名/troubleshoot.html
echo - 测试表单: https://你的域名/form-test.html
echo - 管理页面: https://你的域名/admin-netlify.html
echo.
pause
