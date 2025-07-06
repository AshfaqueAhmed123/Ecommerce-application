import {Router} from "express"
import {
    create,
    remove,
    update,
    fetchById,
    fetchByProductId
} from "../controllers/review.controllers.js"
import {verifyJWT} from "../middlewares/Auth.middleware.js"

const router = Router();

router.route("/").post(create)
router.route("/:id").patch(update).delete(remove).get(fetchById)
router.route("/product/:id").get(fetchByProductId)

export {router as reviewsRouter}
