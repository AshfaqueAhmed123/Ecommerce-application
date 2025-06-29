import mongoose,{Schema,model} from "mongoose"

const cartSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:ture,
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:"Product",
    }],
},{
    timestamps:true
})

export const Cart = model("Cart", cartSchema);