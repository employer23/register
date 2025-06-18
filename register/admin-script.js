// 管理员页面脚本
// 数据从API获取，支持跨设备访问

// API配置
const API_BASE = 'https://你的API地址/api';

// 工具函数
async function getRegistrations() {
    try {
        const response = await fetch(`${API_BASE}/registrations`);
        if (!response.ok) throw new Error('获取数据失败');
        return await response.json();
    } catch (error) {
        console.error('获取报名数据失败:', error);
        alert('获取数据失败，请检查网络连接');
        return [];
    }
}

async function getStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        if (!response.ok) throw new Error('获取统计数据失败');
        return await response.json();
    } catch (error) {
        console.error('获取统计数据失败:', error);
        return { total: 0, individual: 0, team: 0, today: 0 };
    }
}

// 页面切换
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        const section = this.getAttribute('data-section');
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        document.getElementById('pageTitle').textContent = this.textContent.trim();
        if(section === 'dashboard') renderDashboard();
        if(section === 'registrations') renderTable();
    });
});

// 渲染数据概览
async function renderDashboard() {
    const stats = await getStats();
    document.getElementById('totalCount').textContent = stats.total;
    document.getElementById('individualCount').textContent = stats.individual;
    document.getElementById('teamCount').textContent = stats.team;
    document.getElementById('todayCount').textContent = stats.today;
    
    // 最新报名
    const regs = await getRegistrations();
    const recent = regs.slice(0, 5);
    const recentList = document.getElementById('recentList');
    recentList.innerHTML = recent.map(r=>`
        <div class="recent-item">
            <b>${r.name}</b> - ${r.school} - ${r.grade} - ${r.registration_type==="team"?"小队":"个人"}
        </div>
    `).join('');
}

// 渲染表格
async function renderTable() {
    const regs = await getRegistrations();
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = regs.map((r,i)=>`
        <tr>
            <td><input type='checkbox' data-id='${r.id}'></td>
            <td>${r.name}</td>
            <td>${r.phone}</td>
            <td>${r.school}</td>
            <td>${r.grade}</td>
            <td>${r.registration_type==="team"?"小队":"个人"}</td>
            <td>${r.registration_type==="team"?`${r.team_name||""} (${r.team_size||""}人)`:"-"}</td>
            <td>${r.created_at ? new Date(r.created_at).toLocaleString('zh-CN') : "-"}</td>
            <td>
                <button onclick='showDetail(${JSON.stringify(r).replace(/'/g, "\\'")})''>详情</button>
                <button onclick='deleteRecord(${r.id})' style='margin-left:5px;background:#e53e3e;color:white;'>删除</button>
            </td>
        </tr>
    `).join('');
}

// 详情模态框
function showDetail(record) {
    let html = `<ul style='line-height:2;'>`;
    html += `<li><b>姓名：</b>${record.name}</li>`;
    html += `<li><b>手机号：</b>${record.phone}</li>`;
    html += `<li><b>学校：</b>${record.school}</li>`;
    html += `<li><b>年级：</b>${record.grade}</li>`;
    html += `<li><b>报名类型：</b>${record.registration_type === 'team' ? '小队报名' : '个人报名'}</li>`;
    if (record.registration_type === 'team') {
        html += `<li><b>小队名称：</b>${record.team_name || '-'}</li>`;
        html += `<li><b>小队人数：</b>${record.team_size || '-'}人</li>`;
    }
    html += `<li><b>报名时间：</b>${record.created_at ? new Date(record.created_at).toLocaleString('zh-CN') : '-'}</li>`;
    html += `</ul>`;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// 删除单个记录
async function deleteRecord(id) {
    if (!confirm('确定要删除这条记录吗？')) return;
    
    try {
        const response = await fetch(`${API_BASE}/registrations/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        
        if (result.success) {
            alert('删除成功');
            refreshData();
        } else {
            alert('删除失败：' + (result.error || '未知错误'));
        }
    } catch (error) {
        alert('删除失败，请检查网络连接');
        console.error('删除错误:', error);
    }
}

// 导出功能
async function exportToCSV() {
    const regs = await getRegistrations();
    if(!regs.length) return alert('无数据');
    
    const headers = ['ID', '姓名', '手机号', '学校', '年级', '报名类型', '小队名称', '小队人数', '报名时间'];
    const csvData = regs.map(r => [
        r.id,
        r.name,
        r.phone,
        r.school,
        r.grade,
        r.registration_type === 'team' ? '小队报名' : '个人报名',
        r.team_name || '',
        r.team_size || '',
        r.created_at ? new Date(r.created_at).toLocaleString('zh-CN') : ''
    ]);
    
    const csv = [headers, ...csvData].map(row => 
        row.map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',')
    ).join('\r\n');
    
    const blob = new Blob(['\ufeff' + csv], {type:'text/csv;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'registrations.csv';
    a.click();
}

async function exportToJSON() {
    const regs = await getRegistrations();
    if(!regs.length) return alert('无数据');
    const blob = new Blob([JSON.stringify(regs,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'registrations.json';
    a.click();
}

async function exportToExcel() {
    const regs = await getRegistrations();
    if(!regs.length) return alert('无数据');
    
    // 转换数据格式以便Excel显示
    const excelData = regs.map(r => ({
        'ID': r.id,
        '姓名': r.name,
        '手机号': r.phone,
        '学校': r.school,
        '年级': r.grade,
        '报名类型': r.registration_type === 'team' ? '小队报名' : '个人报名',
        '小队名称': r.team_name || '',
        '小队人数': r.team_size || '',
        '报名时间': r.created_at ? new Date(r.created_at).toLocaleString('zh-CN') : ''
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '报名数据');
    XLSX.writeFile(wb, 'registrations.xlsx');
}

// 清空数据
async function clearAllData() {
    if(!confirm('确定要清空所有报名数据吗？此操作不可撤销！')) return;
    
    try {
        const response = await fetch(`${API_BASE}/registrations/all`, {
            method: 'DELETE'
        });
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            refreshData();
        } else {
            alert('清空失败：' + (result.error || '未知错误'));
        }
    } catch (error) {
        alert('清空失败，请检查网络连接');
        console.error('清空错误:', error);
    }
}

// 刷新
async function refreshData() {
    await renderDashboard();
    await renderTable();
}

// 初始化
window.onload = async function() {
    await renderDashboard();
    await renderTable();
    // 关闭模态框事件
    document.getElementById('detailModal').onclick = function(e){if(e.target===this)closeDetailModal();};
};
