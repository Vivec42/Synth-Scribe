const express = require("express");

const userRoutes = require("./user.routes");
const threadRoutes = require("./thread.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/threads", threadRoutes);

module.exports = router;
