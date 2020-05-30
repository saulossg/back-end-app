import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolter = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolter,
  storage: multer.diskStorage({
    destination: tmpFolter,
    filename(request, file, callback) {
      const fileHast = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHast}=${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
