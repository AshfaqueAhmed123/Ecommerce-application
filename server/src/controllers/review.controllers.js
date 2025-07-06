import { Review } from "../models/review.model.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import { ApiError } from "../utils/ApiError.utils.js"

const create = async (req, res) => {
    try {
        const { user, product, message } = req.body;
        if (!user || !product || !message) {
            return res.status(400).json(
                new ApiError(400, "all fields are required")
            )
        }
        const review = await Review.create({
            user, product, message
        })
        if (!review) {
            return res.status(500).json(
                new ApiError(500, "unable to create review")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "review created",
                review
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message
            )
        )
    }
}

const remove = async (req, res) => {
    try {
        const reviewId = req.params.id;
        if (!reviewId) {
            return res.status(400).json(
                new ApiError(400, "review id is required")
            )
        }
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(500).json(new ApiError(400, "unable to delete review"))
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "review deleted!",
                review
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message
            )
        )
    }
}

const update = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { message } = req.body;
        if (!message || !reviewId) {
            return res.status(400).json(
                new ApiError(400, "reviewId && message are required")
            )
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(500).json(
                new ApiError(500, "unable to find review")
            )
        }
        review.message = message;
        await review.save({ validateBeforeSave: false })

        const updatedReview = await Review.findById(reviewId);
        if (!updatedReview) {
            return res.status(500).json(
                new ApiError(500, "unable to update review")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "review updated",
                updatedReview
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message
            )
        )
    }
}

const fetchById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        if (!reviewId) {
            return res.status(400).json(
                new ApiError(400, "reviewId is required")
            )
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(500).json(
                new ApiError(500, "unable to find review")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "review fetched",
                review
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message
            )
        )
    }
}

const fetchByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json(
                new ApiError(400, "productId is required")
            )
        }
        const reviews = await Review.find({
            product: productId
        })
        if (!reviews) {
            return res.status(500).json(
                new ApiError(500, "unable to fetch reviews")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "reviews fetched",
                reviews
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(
                error?.status || 400,
                error?.message
            )
        )
    }
}


export { create, remove, update, fetchById, fetchByProductId }