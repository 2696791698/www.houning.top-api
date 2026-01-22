const express = require('express')
const cors = require('cors')
require('dotenv').config()

const articleRoutes = require('./routes/articleRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/article', articleRoutes)

app.get('/api', (req, res) => {
    res.json({
        message: 'API连接正常'
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
})