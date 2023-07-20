var multer = require('multer');

class Storage {
    constructor(path, fieldInReq) {
        this.path = path
        this.fieldInReq = fieldInReq
    }

    saveFile = () => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/${this.path}`);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
        const upload = multer({ storage })
        return [
            upload.single(this.fieldInReq),
            (req, res, next) => {
                req.file
            }
        ]
    }
}

const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/post');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const personStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/person');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const savePostImage = [
    multer({ storage }).single("avatar"),
    (req, res, next) => {

    }]