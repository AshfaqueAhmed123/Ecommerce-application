import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const create = async (req,res) => {
    try {
        const {title,description,price,discount,owner,isPublished} = req.body;
        if([title,description,price,discount,owner,isPublished].some(item => item === "" || item === undefined)){
            return res.status(400).json(
                new ApiError(400, "title,description,price,discount,owner and isPublished are required")
            ) 
        }
        const product = await Product.create({
            title,
            description,
            price,
            discount,
            owner,
            isPublished
        })
        if(!product){
            return res.status(500).json(
                new ApiError(500, "unable to create product")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "product created",
                product
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
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json(
                new ApiError(400,"product id is required")
            )
        }
        const product = await Product.findByIdAndDelete(productId);
        if(!product) return res.status(500).json(new ApiError(400,"unable to delete product")) 

        return res.status(200).json(
            new ApiResponse(
                200,
                "product deleted!",
                product
            )
        )
    } catch (error) {
         return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const fetchById = async (req,res) => {
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json(
                new ApiError(400,"product id is required")
            )
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json(
                new ApiError(404,"invalid id can't find product")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "product fetched",
                product
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const fetchAll = async (req,res) => {
    try {
        const {limit} = req.headers;
        const products = await Product.find().limit(limit);
        if(!products){
            return res.status(500).json(
                new ApiError(500,"unable to fetch products")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "products fetched",
                products
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const update = async (req, res) => {
    try {
        const productId = req.params.id;
        const {title, description, price, discount, owner, isPublished } = req.body;
        if ([productId,title, description, price, discount, owner, isPublished].some(item => item === "" || item === undefined)) {
            return res.status(400).json(
                new ApiError(400, "productId,title,description,price,discount,owner and isPublished are required")
            )
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(400).json(
                new ApiError(400, "invalid product id")
            )
        }

        product.title = title;
        product.description = description;
        product.price = price;
        product.discount = discount;
        product.isPublished = isPublished;
        product.owner = owner;

        await product.save({validateBeforeSave:false})

        const updatedProduct = await Product.findById(productId)

        if(!updatedProduct){
            return res.status(500).json(
                new ApiError(500,"unable to update product")
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "product updated",
                updatedProduct
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {create, remove, fetchById, fetchAll, update}