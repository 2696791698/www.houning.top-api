const express = require('express')
const router = express.Router()
const {
    createArticle,
    updateArticle,
    getArticleList,
    getArticleById
} = require('../controllers/articleController')

router.post('/', createArticle)

router.put('/:id', updateArticle)

router.get('/', getArticleList)

router.get('/:id', getArticleById)

module.exports = router