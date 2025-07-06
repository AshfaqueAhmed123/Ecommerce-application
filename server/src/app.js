import express from "express"
import cors from "cors"
import {handleNotFound} from "./utils/handleNotFound.utils.js"

const app = express();

app.use(cors())
app.use(express.json({
    limit:"16kb",
}))
app.use(express.urlencoded({
    limit:"16kb",
    extended:true,
}))

// routes
import {userRouter} from "./routes/user.routes.js"
import {productRouter} from "./routes/product.routes.js"
import {cartRouter} from "./routes/cart.routes.js"
import {reviewsRouter} from "./routes/review.routes.js"
app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/review",reviewsRouter)
app.use("/",handleNotFound)

export {app}