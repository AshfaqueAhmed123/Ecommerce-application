import {Schema,model} from "mongoose";

const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",        
        required:true
    },
    address:{
        type:String,
        required:true
    },
    payment_method:{
        type:String,
        enum:[
            "cash on delivery",
            "bank account",
            "google pay",
            "easypaisa",
            "jazzcash"
        ],
        required:true
    },
    shipping_cost:{
        type:Number,
        required:true
    },
    total_cost:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending", "delivered", "processing", "compeleted"],
        required:true
    },
},{
    timestamps:true,
})

export const Order = model("Order", orderSchema);