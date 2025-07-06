import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreskTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error?.message || "something went wrong while generating tokens")
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        
        const { fullName, username, email, password } = req.body;
        if (!fullName || !username || !email || !password) {
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
            fullName, username, email, password, role:"customer"
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


const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!password && (!email && !password)) {
            return res.status(400).json(
                new ApiError(400, "email or username and password are required")
            )
        }
        const user = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (!user) {
            return res.status(400).json(
                new ApiError(400, "this user does not exists")
            )
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            return res.status(401).json(
                new ApiError(401, "invalid credentials")
            )
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreskTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        return res.status(200).json(
            new ApiResponse(
                200,
                "user logged in",
                {
                    uesr: loggedInUser,
                    accessToken,
                    refreshToken
                }
            )
        )

    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json(
            new ApiResponse(200, "logged out")
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const { incomingRefreshToken } = req.body;
        if (!incomingRefreshToken) {
            return res.status(400).json(
                new ApiError(400, "refresh token is required")
            )
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            return res.status(401).json(
                new ApiError(401, "invalid refreshToken")
            )
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json(
                new ApiError(401, "refresh token is expired or malformed!")
            )
        }
        const { accessToken, refreshToken} = await generateAccessAndRefreskTokens(user._id)
        return res.status(200).json(
            new ApiResponse(
                200,
                "access token refreshed",
                { accessToken, refreshToken }
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export { register, login, logout, refreshAccessToken }