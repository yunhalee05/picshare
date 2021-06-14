import multer from 'multer';
import express from 'express';
import { isAdmin, isAuth } from '../utils.js';

const profileuploadRouter = express.Router();

const storage= multer.diskStorage({//업로드위해 multer사용
    destination(req, file, cb){//저장할 위치
        cb(null, 'profileuploads/')
    },
    filename(req, file, cb){//파일이름 지정
        cb(null, `${Date.now()}.jpg`);
    }
});

const profileupload = multer({storage});//미들웨어

profileuploadRouter.post('/', isAuth, profileupload.single('image'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

export default profileuploadRouter