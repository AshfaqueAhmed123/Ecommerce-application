import {Cart} from "../models/cart.model.js"
import {ApiError} from "../utils/ApiError.utils.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"

const create = async (req,res) => {
    try {
        const {product,quantity,owner} = req.body;
        if(!product || !quantity || !owner){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const cart = await Cart.create({
            product,quantity,owner
        })
        if(!cart){
            return res.status(500).json(
                new ApiError(500,"unable to create cart")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "cart created",
                cart
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const remove = async (req,res) => {
    try {
        const cartId = req.params.id;
        if (!cartId) {
            return res.status(400).json(
                new ApiError(400, "cart id is required")
            )
        }
        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) return res.status(500).json(new ApiError(400, "unable to delete cart"))

        return res.status(200).json(
            new ApiResponse(
                200,
                "cart deleted!",
                cart
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const updateQuantity = async (req,res) => {
    try {
        const cartId = req.params.id;
        const {quantity} = req.body;
        if(!quantity || !cartId){
            return res.status(400).json(
                new ApiError(400, "cartId && quantity are required")
            )
        } 
        const cart = await Cart.findById(cartId);
        if(!cart){
            return res.status(500).json(
                new ApiError(500,"unable to find cart")
            )
        }

        cart.quantity = quantity;
        await cart.save({validateBeforeSave:false})

        const updatedCart = await Cart.findById(cartId);
        if(!updatedCart){
            return res.status(500).json(
                new ApiError(500,"unable to update quantity")
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "quantity updated",
                updatedCart
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
} 

const emptyCart = async (req,res) => {
    try {
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json(
                new ApiError(400,"user id is required")
            ) 
        }
        const carts = await Cart.find({owner:userId})
        if(!carts){
            return res.status(400).json(
                new ApiError(400,"unable to find carts")
            )
        }

        carts.map((cart)=>{
            (async()=>{
                await Cart.findByIdAndDelete(cart?._id)
            })()
        })

        const emptyCarts = await Cart.find({owner:userId})

        if(emptyCarts.length > 0){
            return res.status(500).json(
                new ApiError(500,"unable to empty cart")
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "empty cart",
                emptyCarts
            )
        )

    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const fetchByUserId = async (req,res) => {
    try {
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json(
                new ApiError(400,"user id is required")
            ) 
        }
        const carts = await Cart.find({owner:userId})
        if(!carts){
            return res.status(400).json(
                new ApiError(400,"unable to find carts")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "carts fetched",
                carts
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {create, remove, updateQuantity, emptyCart, fetchByUserId}