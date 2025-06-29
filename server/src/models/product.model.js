import mongoose,{Schema,model} from "mongoose"

const productSchema = new Schema({
    title:{
        type:string,
        required:true,
    },
    description:{
        type:string,
        required:true,
    },
    images:[{
       type:String,
       required:true,
    }],
    videos:[{
        type:String,
        required:true,
    }],
    price:{
        type:string,
        required:true,
    },
    discount:{
        type:string,
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
    }
},{
    timestamps:true,
})

export const Product = model("Product", productSchema);