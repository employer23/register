const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接配置
const dbConfig = {
  host: 'mysql.sqlpub.com',
  port: 3306,
  user: 'employer23',
  password: 'JJe8YdslETSs7yZt',
  database: 'submissions',
  charset: 'utf8mb4'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 健康检查接口
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'ok', message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 获取所有报名数据
app.get('/api/registrations', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM registrations ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('获取报名数据失败:', error);
    res.status(500).json({ error: '获取数据失败', details: error.message });
  }
});

// 新增报名
app.post('/api/registrations', async (req, res) => {
  try {
    const { name, phone, school, grade, registrationType, teamName, teamSize } = req.body;

    // 数据验证
    if (!name || !phone || !school || !grade || !registrationType) {
      return res.status(400).json({ error: '必填字段不能为空' });
    }

    // 如果是小队报名，验证小队信息
    if (registrationType === 'team') {
      if (!teamName || !teamSize) {
        return res.status(400).json({ error: '小队报名必须填写小队名称和人数' });
      }
    }

    const insertData = {
      name,
      phone,
      school,
      grade,
      registration_type: registrationType,
      team_name: registrationType === 'team' ? teamName : null,
      team_size: registrationType === 'team' ? parseInt(teamSize) : null,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [result] = await pool.execute(
      'INSERT INTO registrations (name, phone, school, grade, registration_type, team_name, team_size, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [insertData.name, insertData.phone, insertData.school, insertData.grade, insertData.registration_type, insertData.team_name, insertData.team_size, insertData.created_at, insertData.updated_at]
    );

    res.json({ 
      success: true, 
      id: result.insertId,
      message: '报名成功！'
    });

  } catch (error) {
    console.error('新增报名失败:', error);
    res.status(500).json({ error: '报名失败', details: error.message });
  }
});

// 删除报名记录
app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM registrations WHERE id = ?', [id]);
    
    if (result.affectedRows > 0) {
      res.json({ success: true, message: '删除成功' });
    } else {
      res.status(404).json({ error: '记录不存在' });
    }
  } catch (error) {
    console.error('删除记录失败:', error);
    res.status(500).json({ error: '删除失败', details: error.message });
  }
});

// 批量删除报名记录
app.delete('/api/registrations', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: '请提供要删除的记录ID' });
    }

    const placeholders = ids.map(() => '?').join(',');
    const [result] = await pool.execute(`DELETE FROM registrations WHERE id IN (${placeholders})`, ids);
    
    res.json({ 
      success: true, 
      message: `成功删除 ${result.affectedRows} 条记录` 
    });
  } catch (error) {
    console.error('批量删除失败:', error);
    res.status(500).json({ error: '批量删除失败', details: error.message });
  }
});

// 清空所有数据
app.delete('/api/registrations/all', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM registrations');
    res.json({ 
      success: true, 
      message: `成功清空所有数据，共删除 ${result.affectedRows} 条记录` 
    });
  } catch (error) {
    console.error('清空数据失败:', error);
    res.status(500).json({ error: '清空数据失败', details: error.message });
  }
});

// 统计接口
app.get('/api/stats', async (req, res) => {
  try {
    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM registrations');
    const [individualResult] = await pool.execute('SELECT COUNT(*) as count FROM registrations WHERE registration_type = "individual"');
    const [teamResult] = await pool.execute('SELECT COUNT(*) as count FROM registrations WHERE registration_type = "team"');
    
    // 今日报名统计
    const today = new Date().toISOString().split('T')[0];
    const [todayResult] = await pool.execute('SELECT COUNT(*) as count FROM registrations WHERE DATE(created_at) = ?', [today]);

    res.json({
      total: totalResult[0].total,
      individual: individualResult[0].count,
      team: teamResult[0].count,
      today: todayResult[0].count
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ error: '获取统计数据失败', details: error.message });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
});

module.exports = app;
