const RestaurantModel = require("../models/restaurantModel")
const CustomError = require("../utility/CustomError")


export const showRestaurants = async(req, res, next) => {
    try {
        const restaurants = await RestaurantModel.find({ownerId: req.user._id});

        if(!restaurants){
            throw new CustomError("Restaurants not found", 404);
        }

        res.status(200).json({
            success: true,
            data: restaurants,
        })
    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}

export const showSingleRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findById({_id: id, ownerId: req.user._id});

        if (!restaurant) {
            throw new CustomError("Restaurant not found", 404);
        }

        res.status(200).json({
            success: true,
            data: restaurant,
        })
    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}

export const createRestaurant = async(req, res, next) => {
    try {
        const { name, address, cuisine, hoursOfOperation, phone } = req.body;
        let restaurant = await RestaurantModel.findOne({ name });

        if (restaurant) {
            throw new CustomError("Restaurant already exists", 400);
        }

        restaurant = await RestaurantModel.create({ name, address, cuisine, hoursOfOperation, phone, ownerId: req.user._id });

        res.status(201).json({
            success: true,
            data: restaurant,
        })
    }catch (error) {
        next( new CustomError(error, 400) );
    }
}

export const updateRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params;
        const restaurantKey = Object.keys(req.body);
        const validKey = ["name", "address", "cuisine", "hoursOfOperation", "phone"];
        const isValidKey = restaurantKey.every((key) => {
            return validKey.includes(key);
        })

        if (!isValidKey) {
            throw new CustomError("Invalid updates", 400);
        }

        const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!restaurant){
            throw new CustomError("Restaurant not found", 404);
        }

        res.status(200).json({
            success: true,
            data: restaurant,
        })
    }catch (error) {
        next( new CustomError(error, 400) );
    }
}

export const deleteRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findByIdAndDelete(id);
        if (!restaurant){
            throw new CustomError("Restaurant not found", 404);
        }

        res.status(200).json({
            success: true,
            data: restaurant,
        })
    } catch (error) {
        next( new CustomError(error, 400) );
        
    }
}