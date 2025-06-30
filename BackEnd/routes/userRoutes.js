const express = require("express");
const { registerUser, loginUser, getAllUsers, getUser, resetBalance, changePassword } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/changepassword", protect, changePassword); 
userRouter.get("/all", getAllUsers);
userRouter.get("/user", protect, getUser);
userRouter.get("/resetBalance", protect, resetBalance); 

module.exports = userRouter;