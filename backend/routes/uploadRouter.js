import multer from 'multer';
import express from 'express';
import { isAdmin, isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage= multer.diskStorage({//업로드위해 multer사용
    destination(req, file, cb){//저장할 위치
        cb(null, 'uploads/')
    },
    filename(req, file, cb){//파일이름 지정
        cb(null, `${Date.now()}.jpg`);
    }
});

const upload = multer({storage});//미들웨어

uploadRouter.post('/', isAuth, upload.single('image'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

export default uploadRouter