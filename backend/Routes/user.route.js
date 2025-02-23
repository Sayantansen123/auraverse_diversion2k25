import express from "express"
import { increaseUserPoints, userLogin, userLogOut, userRegister, userWalletAdd } from "../RoutesController/user.controller.js";
import isLogin from "../Middleware/isLogin.js";
import { postSave } from "../RoutesController/post.controller.js";

const router = express.Router();

//register route
router.post("/register",userRegister)

//login route
router.post("/login",userLogin)

//logout routes
router.post("/logout",userLogOut)

//wallet update route
router.post("/walletChange",isLogin, userWalletAdd)

router.post("/postsave",isLogin, postSave)

router.post("/reward",isLogin,increaseUserPoints)


export default router