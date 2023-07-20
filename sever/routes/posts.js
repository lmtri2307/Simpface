var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController')
var multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/post');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage });

router.post('/upload', upload.single("avatar"), postController.upload)

router.post('/create', postController.createPost)

router.put('/:postId/like', postController.likePost)

router.get('/:userName', postController.findPosts)

router.get('/timeline/all', postController.timeline)

router.put('/:postId/comment', postController.comment)


module.exports = router;