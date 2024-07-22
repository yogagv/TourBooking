import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({

    title:{

        type: String,
        required: true,
        unique:true
    },

    city: {

        type: String,
        required: true
    },

    address: {

        type: String,
        default: null
    },

    distance: {
        type: Number,
        required: true,
    },

    image: {

        type: String,
        required: true
    },

    price: {

        type: Number,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    maxGroupSize: {
        type: Number,
        required: true
    },

    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: "review"
        }
    ],

    featured: {

        type: Boolean,
        default:false
    },

    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        name: {
            type:String,
            required:true,
        }
    }
},
    { timestamps: true }
)

export default mongoose.model("Tour", TourSchema);