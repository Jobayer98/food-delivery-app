const RestaurantModel = require("../models/restaurantModel")
const CustomError = require("../utility/CustomError")


const showRestaurants = async(req, res, next) => {
    try {
        const restaurants = await RestaurantModel.find();

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

const showSingleRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findById(id);

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

const ownerShowRestaurants = async(req, res, next) => {
    try {
        const restaurants = await RestaurantModel.find({ ownerId: req.user._id });

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

// const ownerSingleRestaurant = async(req, res, next) => {
//     try {
//         const { id } = req.params;
//         const restaurant = await RestaurantModel.findById({ id, ownerId: req.user._id });

//         if (!restaurant) {
//             throw new CustomError("Restaurant not found", 404);
//         }

//         res.status(200).json({
//             success: true,
//             data: restaurant,
//         })
//     } catch (error) {
//         next( new CustomError(error, 400) );
        
//     }
// }
const createRestaurant = async(req, res, next) => {    
    try {
        const { name } = req.body;
        let restaurant = await RestaurantModel.findOne({ name });

        if (restaurant) {
            throw new CustomError("Restaurant already exists", 400);
        }

        restaurant = await RestaurantModel.create({ ...req.body, ownerId: req.user._id });

        res.status(201).json({
            success: true,
            data: restaurant,
        })
    }catch (error) {
        next( new CustomError(error, 400) );
    }
}

const updateRestaurant = async(req, res, next) => {
    try {
        const restaurantKey = Object.keys(req.body);
        const validKey = ["name", "address", "cuisine", "hoursOfOperation", "phone"];
        const isValidKey = restaurantKey.every((key) => {
            return validKey.includes(key);
        })

        if (!isValidKey) {
            throw new CustomError("Invalid updates", 400);
        }

        await RestaurantModel.findOneAndUpdate({ ownerId: req.user._id }, {...req.body});
        const restaurant = await RestaurantModel.findOne({ ownerId: req.user._id });
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

const deleteRestaurant = async(req, res, next) => {
    try {
        const restaurant = await RestaurantModel.findOneAndDelete({ ownerId: req.user._id });
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

module.exports = {
    showRestaurants,
    showSingleRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    ownerShowRestaurants,
}