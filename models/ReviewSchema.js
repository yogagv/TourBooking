import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({


    tour: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            required: true
        },
        title: {
            type:String,
        }
    },



      user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type:String,
        }
    },

    review: {
        type: String,
    },

    rating: {
        type:String,
        min: 0,
        max: 5,
        default: "Not rated"
    }

})

export default mongoose.model('Review', ReviewSchema)