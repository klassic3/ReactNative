const express = require("express");
const { registerUser, loginUser, getAllUsers, getUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers);
userRouter.get("/user", protect, getUser);

module.exports = userRouter;