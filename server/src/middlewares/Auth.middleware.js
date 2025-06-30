import { ApiError } from "../utils/ApiError.utils.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const verifyJWT = async (req,res,next) => {
    try {
           const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
           if(!token){
            return res.status(401).json(
                new ApiError(401,"unauthorized request")
            )
           }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            return res.status(404).json(
                new ApiError(404,"invalid access token")
            )
        }

        req.user = user;

        next()
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message 
            )
        )
    }
}