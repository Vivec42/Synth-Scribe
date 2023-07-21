const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

class FileController {
  static uploadImage = async (req, res, next) => {
    const parsedData = JSON.parse(req.body.articleData);

    fs.access(
      path.join(__dirname, "../../public/assets/images/posts"),
      (error) => {
        if (error) {
          fs.mkdirSync(
            path.join(__dirname, "../../public/assets/images/posts")
          );
        }
      }
    );

    req.images = [];
    try {
      await Promise.all(
        req.files.map(async (file) => {
          const { buffer } = file;
          const timestamp = new Date().toISOString();
          const ref = `${timestamp}-${parsedData.title.replaceAll(" ", "-")}-${
            Math.floor(Math.random() * (9999 - 0 + 1)) + 0
          }.webp`;

          await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(
              path.join(__dirname, `../../public/assets/images/posts/${ref}`)
            );

          req.images.push(ref);
        })
      );

      req.body = { ...parsedData };

      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };
}

module.exports = FileController;
