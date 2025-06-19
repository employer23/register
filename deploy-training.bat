@echo off
echo ===========================================================
echo   添加"是否参加培训"字段到报名表单
echo ===========================================================

echo.
echo 1. 添加所有文件到Git...
git add .

echo.
echo 2. 提交更改...
git commit -m "添加"是否参加培训"必选字段到报名表单

新增功能:
- 在index.html和index-new.html中添加培训选项
- 更新预渲染表单页面支持新字段
- 在form-test.html中添加培训测试选项
- 更新admin.html表格显示培训信息
- 更新admin-script.js支持培训字段的显示和导出
- 所有表单提交将包含培训选择信息"

echo.
echo 3. 推送到GitHub...
git push origin main

echo.
echo ✅ 部署完成！
echo.
echo 更新内容:
echo - 新增"是否参加培训"必选字段
echo - 支持培训信息的显示和导出
echo - 在Netlify Forms中可查看培训选择
echo.
pause
