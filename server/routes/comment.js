const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');
router.post('/add', async (req, res) => {
    var { ProductId, content ,image } = req.body
    var commentNew = await models.comments.create({ ProductId: ProductId, UserId: req.user.id, image: image, content: content });
    commentNew.save()
    return res.status(200).json(commentNew)
})
router.post('/add_repcomment', async (req, res) => {
    var { CommentId, image , content } = req.body
    console.log(req.body)
    var rep_commentsNew = await models.rep_comments.create({ CommentId: CommentId, UserId: req.user.id,  image: image, content: content });
    rep_commentsNew.save()
    return res.status(200).json('ok')
})

module.exports = router;