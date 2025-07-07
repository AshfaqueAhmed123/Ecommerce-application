import {Router} from "express";
import {
    place,
    remove,
    fetchAll,
    updateStatus
} from "../controllers/order.controllers.js"
import {verifyJWT} from "../middlewares/Auth.middleware.js"

const router = Router();

router.route("/").post(place).get(fetchAll)
router.route("/:id").delete(remove).patch(updateStatus)

export {router as orderRouter}