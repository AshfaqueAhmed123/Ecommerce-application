import mongoose,{model,Schema} from "mongoose"

const reviewSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    message:{
        type:String,
        required:true
    },
},{
    timestamps:true,
})

export const Review = model("Review",reviewSchema)