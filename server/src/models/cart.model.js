import mongoose,{Schema,model} from "mongoose"

const cartSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
    },
    quantity:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
})

export const Cart = model("Cart", cartSchema);