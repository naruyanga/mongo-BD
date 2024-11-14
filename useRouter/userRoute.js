const Router = require("express");
const userRouter = Router();

const signup = require("../useRouter/userController/userController");

userRouter.post("/signup", signup);

module.exports = userRouter;
