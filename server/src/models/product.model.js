import mongoose,{Schema,model} from "mongoose"

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[{
       type:String,
    //    required:true,
    }],
    videos:[{
        type:String,
        // required:true,
    }],
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isPublished:{
        type:Boolean,
        required:true,
    },
},{
    timestamps:true,
})

export const Product = model("Product", productSchema);