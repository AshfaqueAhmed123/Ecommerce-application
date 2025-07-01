import express from "express"
import cors from "cors"

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
app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)

export {app}