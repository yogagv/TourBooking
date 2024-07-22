import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

    reviewText: {
        type: String,
        required: true
    },

    rating: {
        type:Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    }

})

export default mongoose.model('Review',ReviewSchema)