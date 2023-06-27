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

router.post('/upload', upload.single("avatar"), function (req, res, next) {
    postController.upload(req, res)

})

router.post('/create', function (req, res, next) {
    postController.createPost(req, res)
})

router.put('/:postId/like', function (req, res, next) {
    postController.likePost(req, res)
})

router.get('/:userName', function (req, res, next) {
    postController.findPosts(req, res)
})

router.get('/timeline/all', function (req, res, next) {
    postController.timeline(req, res)
})

router.put('/:postId/comment', function (req, res, next) {
    postController.comment(req, res)
})


module.exports = router;