import mongoose,{Schema,model} from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","customer"],
        required:true
    },
    profilePicture:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
},{
    timestamps:true
})



userSchema.pre("save", async function (){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password,10)
    }
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcryptjs.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
       return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIARY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIARY
        }
    )
}


export const User = model("User", userSchema)