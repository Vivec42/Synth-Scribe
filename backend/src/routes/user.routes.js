const express = require("express");

const router = express.Router();

const { UserController } = require("../controllers");

// router.get("/", userControllers.browse);
// router.get("/:id", userControllers.read);
// router.put("/:id", userControllers.edit);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.delete("/:id", userControllers.destroy);

module.exports = router;
