const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");
const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers);

module.exports = userRouter;