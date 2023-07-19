const express = require("express");

const router = express.Router();

const { ThreadController, AuthController } = require("../controllers");

router.get("/", AuthController.isUserConnected, ThreadController.browseThreads);
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
  ThreadController.addThread
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  ThreadController.deleteThread
);

module.exports = router;
