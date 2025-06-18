Write-Host "正在部署表单修复到GitHub..." -ForegroundColor Cyan

Write-Host "`n1. 添加所有文件到Git..." -ForegroundColor Yellow
git add .

Write-Host "`n2. 提交更改..." -ForegroundColor Yellow
git commit -m "修复表单404错误和完善故障排除功能

- 优化Netlify Forms提交逻辑
- 添加详细错误处理和调试信息
- 创建表单测试页面(form-test.html)
- 创建故障排除指南(troubleshoot.html)
- 更新README.md添加故障排除说明
- 在主页面添加调试工具链接
- 支持302重定向状态码处理
- 改进参数编码和传输方式"

Write-Host "`n3. 推送到GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ 部署完成！" -ForegroundColor Green
Write-Host "等待几分钟后访问Netlify网站测试表单功能。" -ForegroundColor White

Write-Host "`n调试工具：" -ForegroundColor Cyan
Write-Host "- 故障排除: https://你的域名/troubleshoot.html" -ForegroundColor White
Write-Host "- 测试表单: https://你的域名/form-test.html" -ForegroundColor White
Write-Host "- 管理页面: https://你的域名/admin-netlify.html" -ForegroundColor White

Read-Host "`n按Enter键继续..."
