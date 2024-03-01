import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  // console.log("req sent", req);
  // console.log("file", file);
  // The function should call `cb` with a boolean

  let extension = path.extname(file.originalname);
  console.log("extension", extension);
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    // To reject this file pass `false`, like so:
    console.log("file not accepted");
    cb(null, false);
  } else {
    // To accept the file pass `true`, like so:
    console.log("file accepted");
    cb(null, true);
  }
  // to indicate if the file should be accepted

  // // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
}

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;
