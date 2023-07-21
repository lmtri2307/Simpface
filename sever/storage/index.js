var multer = require('multer');

function storage(path, fieldInReq) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/${path}`);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    const upload = multer({ storage })
    return [
        upload.single(fieldInReq),
        (req, res, next) => {
            req.file.filename = `${path}/${req.file.filename}`
            next()
        }
    ]
}



module.exports = {
    uploadUserImage: new storage("assets/person", "picture"),
    uploadPostImage: new storage("assets/post", "avatar")
}