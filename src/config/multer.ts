import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

// export default {
//   storage: multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'uploads'),
//     filename: (request, file, callback) => {
//       const hash = crypto.randomBytes(6).toString('hex');

//       const fileName = `${hash}-${file.originalname}`;

//       callback(null, fileName);
//     },
//   }),
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
// };
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        const filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'upload-meempresta',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {

      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      cb(null, fileName);
    }

  }),
};

export default  {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes['s3'],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};

