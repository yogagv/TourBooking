import Tour from "../models/TourSchema.js";
import User from "../models/UserSchema.js";

export const createTour = async (req, res, next) => {

    const {title, city, address, distance, image, price, desc, maxGroupSize, reviews, featured} = req.body

    try{

        const userId = req.userId;

        const user = await User.findById(userId) 

        if(!user) {

            res.status(404).json({success:false, message:"User not found"});
        }

        console.log(user)

        let tour = new Tour({

            title,
            city,
            address,
            distance,
            image,
            price,
            desc,
            user: {
                id: userId,
                name: user.name
            },
            maxGroupSize,
            reviews,
            featured
        })

        await tour.save();

        res.status(200).send({success:true, message:"Tour Saved Successfully!"})



    }catch(error){

        res.status(500).send({success:false, message:"Internal Server Error"})
    }

}

//get allTour 

export const allTour = async (req, res, next) => {

    try{

        const tours = await Tour.find();

        res.status(200).send({success:true, message:"Tours found Successfully!", data:tours});

    }catch(error){

        res.status(404).send({success:false, message:"no tour found"});

    }
}

//getSingleTourById

export const getSingleTour = async (req, res, next) => {

    const tourId = req.params.id

    try{

        const tour = await Tour.findById(tourId)

        if(!tour){
            
            res.status(404).send({success:false, message:"Tour not found!"})
        }

            res.status(200).send({success:true, message:"Tour found successfully!", data:tour});

    }catch(error){

            res.status(400).send({success:false, message:"Internal server Error!"})

    }
        
    
}


//getTourbyName 

export const getTourByCity = async (req, res, next) => {

    const tourCity = req.params.city

    try{

        const tour = await Tour.find({city: new RegExp(tourCity, 'i')});

        if(!tour || tour.length === 0){

            return res.status(404).json({success:false, message:"Tour not found"});
            
        }
        console.log(tour)

            res.status(200).json({success:true, message:"Tour found successfully!", data:tour});

    }catch(error){

            res.status(500).json({success:false, messaeg:"Internal server error!"});

    }

}

//getTourByDist

export const getTourByDist = async (req, res, next) => {

    const tourDistance = req.params.distance

    try{

        const tour = await Tour.find({distance: { $gte: tourDistance, $lte: tourDistance }});

        if(!tour || tour.length === 0){

           return res.status(404).send({success:false, message:"Tour not found"});
        }

            res.status(200).send({success:true, message:"Tour found successfully!", data:tour});

    }catch(error){

            res.status(500).send({success:false, messaeg:"Internal server error!"});
    }

        console.log(tour)
}


//getByMaxGroupSize
export const getMaxGroupSize = async (req, res, next) => {

    const maxGroup = req.params.maxGroupSize

    try{

        const tour = await Tour.find({maxGroupSize: { $lte: maxGroup }});

        if(!tour || tour.length === 0){

            return res.status(404).send({success:false, message:"Tour not found"});
        }

            res.status(200).send({success:true, message:"Tour found successfully!", data:tour});

    }catch(error){

            res.status(500).send({success:false, messaeg:"Ineternal server error!"});

    }
}

//updateTour

export const updateTour = async (req, res, next) => {

    const tourid = req.params.id

    try{

        const tour = await Tour.findByIdAndUpdate(tourid, {$set: req.body}, {new: true});

        res.status(200).send({success:true, message:"Tour Updated Successfully!", data:tour});

    }catch(error){

        res.status(404).send({success:false, message:"Failed to update Tour!"})

    }
}


//deleteTour

export const deleteTour = async (req, res ,next) => {

    const tourId = req.params.id;
    const userId = req.userId;

    try{

        const tour = await Tour.findById(userId);

        if(!tour){

            res.status(404).send({success:false, message:"Tour not found!"})

        }

        //check if the user making request is author or not.
        if(tour.user.id.toString() !== userId.toString()){

            return res.status(403).send({success:false, message: "unauthorized: you cannot delete this tour"});
        }

        await Tour.findByIdAndDelete(tourId);

        res.status(200).send({success:true, message: "tour deleted successfully!..."});

    }catch(error){

        res.status(500).send({success:false, message: "Failed to delete the tour"});
    }
}


//getTourbySearch 

export const tourBySearch = async (req, res, next) => {

    // const tourCity = req.params.city
    // const tourDistance = req.params.distance
    // const maxGroup = req.params.maxGroupSize

    const {city, distance, maxGroupSize} = req.body

    try{

        const tourSearch = await Tour.find({city: new RegExp(city, 'i'), distance: {$gte: distance },
                                     maxGroupSize: { $gte: maxGroupSize }});

                                     if(!tourSearch || tourSearch.length === 0){

                                       return res.status(404).send({success:false, message:"Tour not found"});
                                    }
                                            console.log(tourSearch)

                                        res.status(200).send({success:true, message:"Tour found successfully!", data:tourSearch});
                                

    }catch(error){

        res.status(500).send({success:false, message:"Internal server error!"});

        console.log(error)

    }
    
}

//getFeaturedTour 

export const tourByFeatured = async (req, res ,next) => {

    const tourFeature = req.params.featured === true
    
    try{

        const tour = await Tour.find({featured : tourFeature})

        res.status(200).json({success:true, message:"Tour found Successfully!", data: tour})


    }catch(error){

        res.status(404).json({success:false, message:"Tour not Found!"})

    }
}

