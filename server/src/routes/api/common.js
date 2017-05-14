import Router from 'koa-router';
import multer from 'koa-multer';
import commonController from '../../controller/common';

const router = new Router();
// const upload = multer({ dest: 'static/upload/' });

// const storage = multer.diskStorage({
//   destination: 'src/static/upload',
//   filename: function (ctx, file, cb) {
//     var fileFormat = (file.mimetype).split("/");
//     cb(null, 'avator.' + fileFormat[1]);
//   }
// });
// const upload = multer({ storage: storage });

const upload = multer({ dest: 'src/static/upload/' });

router 
  .get('/search/:key', commonController.search)
  .post('/upload', upload.single('avatar'), commonController.upload);

export default router;