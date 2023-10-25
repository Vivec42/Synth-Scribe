const express = require("express");

const router = express.Router();

const { UserController, AuthController } = require("../controllers");

router.get(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserModo,
  UserController.browseUsers
);
router.get("/refreshToken", AuthController.refreshToken);
router.get(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAllowedToGet,
  UserController.findUser
);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put(
  "/ban/:id",
  AuthController.isUserConnected,
  AuthController.isUserModo,
  UserController.banUser
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UserController.deleteUser
);

module.exports = router;
