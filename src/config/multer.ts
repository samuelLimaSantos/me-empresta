import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'uploads'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  // s3: multerS3({
  //   s3: new aws.S3(),
  //   bucket: process.env.BUCKET_NAME,
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   acl: "public-read",
  //   key: (request, file, callback) => {
  //     const hash = crypto.randomBytes(6).toString('hex');

  //     const fileName = `${hash}-${file.originalname}`;

  //     callback(null, fileName);
  //   }
  // })
};
