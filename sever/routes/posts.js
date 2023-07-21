var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController')
const { uploadPostImage } = require('../storage');



router.post('/upload', uploadPostImage, postController.upload)

router.post('/create', postController.createPost)

router.put('/:postId/like', postController.likePost)

router.get('/:userName', postController.findPosts)

router.get('/timeline/all', postController.timeline)

router.put('/:postId/comment', postController.comment)


module.exports = router;