const express = require("express");
// const multer = require("multer");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const router = express.Router();

const {
  ThreadController,
  AuthController,
  // FileController,
} = require("../controllers");

router.get(
  "/names",
  AuthController.isUserConnected,
  ThreadController.browseThreads
);
router.get("/:id", AuthController.isUserConnected, ThreadController.findThread);
router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  ThreadController.editThread
);
router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  // upload.array("files"),
  // FileController.uploadImage,
  ThreadController.addThread
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  ThreadController.deleteThread
);

module.exports = router;
