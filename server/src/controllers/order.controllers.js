import {Order} from "../models/order.model.js"
import {Product} from "../models/product.model.js"
import {ApiError} from "../utils/ApiError.utils.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"


const place = async (req,res) => {
    try {
        const {user,product,address,payment_method} = req.body;
        if(!user || !product || !address || !payment_method){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const already_placed_order = await Order.findOne({
            $and:[{user},{product}]
        })

        if(already_placed_order){
            return res.status(400).json(
                new ApiError(400,"this order is already placed")
            )
        }

        const productItem = await Product.findById(product);

        if(!productItem){
            return res.status(404).json(
                new ApiError(404,"this product does not exists")
            ) 
        }

        const order = await Order.create({
            user,
            product,
            address,
            payment_method,
            shipping_cost:10,
            total_cost:(10+productItem.price)-productItem.discount,
            status:"pending"
        })

        if(!order){
             return res.status(500).json(
                new ApiError(500,"unable to place order")
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "order placed",
                order
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
        const orderId = req.params.id;
        if(!orderId){
            return res.status(400).json(
                new ApiError(400,"order id is required")
            )
        }
        const order = await Order.findByIdAndDelete(orderId);
        if(!order){
            return res.status(500).json(
                new ApiError(500,"unable to delete order")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "order deleted",
                order
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
        const limit = req.headers.limit || 10
        const orders = await Order.find().limit(limit)
        if(!orders){
            return res.status(500).json(
                new ApiError(500, "unable to fetch orders")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "orders fetched",
                orders
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}


const updateStatus = async (req,res) => {
    try {
        const orderId = req.params.id;
        const {status} = req.body;

        if(!orderId || !status){
            return res.status(400).json(
                new ApiError(400, "orderId and status are required")
            )
        }

        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json(
                new ApiError(404,"order not found with this id")
            )
        }

        order.status = status;
        await order.save({validateBeforeSave:false})

        const updated = await Order.findById(orderId);

        if(updated.status !== status){
            return res.status(500).json(
                new ApiError(500,"unbale to update order status")
            )
        }
        
        return res.status(200).json(
            new ApiResponse(
                200,
                "order status updated",
                updated
            )
        )
    } catch (error) {
          return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {place,remove,fetchAll,updateStatus}
