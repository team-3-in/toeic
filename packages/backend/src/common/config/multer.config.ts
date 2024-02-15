import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';

const storage = diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync('./static')) {
      fs.mkdirSync('./static', { recursive: true });
    }

    cb(null, './static');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().split('T')[0]}-${Buffer.from(file.originalname, 'latin1').toString('utf8')}`,
    );
  },
});

export const multerConfig: MulterOptions = {
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
    files: 1,
  },
  fileFilter(req, file, cb) {
    cb(null, true);
  },
};
