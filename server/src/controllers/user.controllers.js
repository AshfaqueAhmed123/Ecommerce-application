import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"

const register = async (req, res) => {
    try {
        const { fullName, username, email, password, role } = req.body;
        if (!fullName || !username || !email || !password || !role) {
            return res.status(400).json(
                new ApiError(400, "all fields are required")
            )
        }
        
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (existingUser) {
            return res.status(400).json(
                new ApiError(400, "user already exists")
            )
        }
        const user = await User.create({
            fullName, username, email, password, role
        })

        if (!user) {
            return res.status(500).json(
                new ApiError(500, "can't register user something went wrong")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "user registered",
                user
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}


export { register }