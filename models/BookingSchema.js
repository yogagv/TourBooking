import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({

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
        fullName: {
            type: String,
            required: true
        },
        guestSize: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        bookAt: {
            type: Date,
            required: true
        },

},
    { timestamps: true}
);

export default mongoose.model('Booking', BookingSchema);