import {Router} from "express";
import {
    create,remove,fetchById,fetchAll,update
} from "../controllers/product.controllers.js"

const router = Router();


router.route("/").post(create).get(fetchAll)
router.route("/:id").delete(remove).get(fetchById).patch(update)

export {router as productRouter}