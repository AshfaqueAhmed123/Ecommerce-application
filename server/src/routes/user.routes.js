import {Router} from "express"
import {
    register,
    login,
    logout,
    refreshAccessToken
} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/Auth.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(verifyJWT,logout)
router.route("/refresh-access-token").patch(refreshAccessToken)

export {router as userRouter}