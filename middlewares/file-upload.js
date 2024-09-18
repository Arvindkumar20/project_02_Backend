import multer from 'multer';
import {v4 as uuid} from 'uuid';
const MIME_TYPE_MAP={
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/jpg':'jpg'
};
export const fileUpload=multer({
limits:500000,//kilobyte,
storage:multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'uploads/images');
    },
    filename:(req,file,cb)=>{
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,uuid()+'.'+ext);
    }
}),
fileFilter:(req,file,cb)=>{
    const isValid=!!  MIME_TYPE_MAP[file.mimetype];
    let error=isValid?null :new Error('Invalid mime type');
    cb(error,isValid)
}
});
