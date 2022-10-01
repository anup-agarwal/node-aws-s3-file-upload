require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const fileUpload = require("express-fileupload");
const S3 = require("aws-sdk").S3;
const fs = require("fs");

const bucket = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/uploads/",
  })
);

app.post("/", (req, res) => {
  console.log(req.files.thefile);
  const fileBuffer = fs.readFileSync(req.files.thefile.tempFilePath);
  bucket.putObject(
    {
      Bucket: process.env.BUCKET_NAME,
      Key: req.files.thefile.name,
      Body: fileBuffer,
    },
    console.log
  );
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
