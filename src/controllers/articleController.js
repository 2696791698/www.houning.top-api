const pool = require('../config/db')

// 上传文章
const createArticle = async (req, res) => {
    try {
        const { title, content } = req.body
        
        // 验证必填字段
        if (!title || !content) {
            return res.status(400).json({ 
                error: '标题和内容不能为空' 
            })
        }
        
        // 插入数据库
        const result = await pool.query(
            'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        )
        
        res.status(201).json({
            message: '文章创建成功',
            article: result.rows[0]
        })
    } catch (err) {
        console.error('创建文章失败:', err)
        res.status(500).json({ error: '服务器内部错误' })
    }
}

// 更新文章
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        
        // 验证必填字段
        if (!title || !content) {
            return res.status(400).json({ 
                error: '标题和内容不能为空' 
            })
        }
        
        // 更新数据库
        const result = await pool.query(
            'UPDATE articles SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [title, content, id]
        )
        
        // 检查文章是否存在
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '文章不存在' })
        }
        
        res.json({
            message: '文章更新成功',
            article: result.rows[0]
        })
    } catch (err) {
        console.error('更新文章失败:', err)
        res.status(500).json({ error: '服务器内部错误' })
    }
}

// 获取文章列表
const getArticleList = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, created_at, updated_at FROM articles ORDER BY created_at DESC'
        )
        
        res.json({
            count: result.rows.length,
            articles: result.rows
        })
    } catch (err) {
        console.error('获取文章列表失败:', err)
        res.status(500).json({ error: '服务器内部错误' })
    }
}

// 通过id获取文章内容
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params
        
        const result = await pool.query(
            'SELECT * FROM articles WHERE id = $1',
            [id]
        )
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '文章不存在' })
        }
        
        res.json(result.rows[0])
    } catch (err) {
        console.error('获取文章失败:', err)
        res.status(500).json({ error: '服务器内部错误' })
    }
}

module.exports = {
    createArticle,
    updateArticle,
    getArticleList,
    getArticleById
};