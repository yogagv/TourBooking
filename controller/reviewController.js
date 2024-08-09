import Review from '../models/ReviewSchema.js'
import User from '../models/UserSchema.js'
import Tour from '../models/TourSchema.js'

export const createReview = async (req, res, next) => {

    const {review, rating} = req.body

    try{

        const userId = req.userId;
        const tourId = req.params.tourId

        
        const user = await User.findById(userId);        
        const tour = await Tour.findById(tourId);


        if(!user){

           return  res.status(404).json({success:false, message:"User not found!"})
        }

        if(!tour){

           return res.status(404).json({success:false, message:"tour not found!"})
           
        }

        let userReview = new Review ({

            user: {
                id: user._id,
            },
            tour: {
                id: tour._id,
            },
            review, 
            rating
        })

        const saveReview = await userReview.save();
        console.log("Review saved successfully:", saveReview);

        // tour.review.push(saveReview._id);
        // const updateTour = await tour.save();

        await Tour.findByIdAndUpdate(tourId, {
            $push: {review: saveReview._id}
        })

        // console.log("Updated Tour:", updateTour);
        console.log("rating:", rating)

        tour.ratingsQuantity = tour.review.length;
        tour.ratingsAverage = 
        (tour.ratingsAverage * (tour.ratingsQuantity - 1) + rating) / tour.ratingsQuantity;

            await tour.save();

        res.status(200).json({success:true, message:"Review Submitted", data:saveReview})

    }catch(error){

        res.status(404).json({success:false, message:"failed to save!"})
        console.log(error.message)

    }

}


export const getReview = async (req, res, next) => {

    const tourId = req.tourId;

    try{

        const getReview = await Review.find({tour: tourId});

        console.log(getReview);

        if(!getReview){

            return res.status(404).json({success:false, message:"Tour review not found!"});
            
        }


            res.status(200).json({success:true, message:"Tour review found", data: getReview });

    } catch(error){

        res.status(500).json({success:false, message:"Internal server Error!"});
    }
}