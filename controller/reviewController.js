import Review from '../models/ReviewSchema.js'
import User from '../models/UserSchema.js'

export const createReview = async (req, res, next) => {

    const {reviewText, rating} = req.body

    try{

        const userId = req.userId
        
        const user = await User.findById(userId) 

        if(!user) {

           return res.status(404).json({success:false, message:"User not found"});
        }

        let userReview = new Review ({

            reviewText, 
            rating
        })

        await userReview.save();

        res.status(200).json({success:true, message:"Review Submitted", data:userReview})

    }catch(error){

        res.status(404).json({success:false, message:"failed to save!"})

    }

}
