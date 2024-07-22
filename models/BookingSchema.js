import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Types.ObjectId,
            ref:'user'
        },
        tourName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
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