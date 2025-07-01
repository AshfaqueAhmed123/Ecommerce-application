import {Router} from "express"
import {
    create,
    remove,
    updateQuantity,
    emptyCart,
    fetchByUserId
} from "../controllers/cart.controllers.js"

const router = Router();

router.route("/").post(create)
router.route("/:id").delete(remove).patch(updateQuantity)
router.route("/user/:userId").delete(emptyCart).get(fetchByUserId)

export {router as cartRouter}