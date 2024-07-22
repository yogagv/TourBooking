import Booking from '../models/BookingSchema.js'
import User from '../models/BookingSchema.js'

export const createBooking = async (req, res, next) => {

    const {tourName, userEmail, fullName, guestSize, phone, bookAt} = req.body

    try{

        let userId = req.userId

        let user = User.findById(userId)

        if(!user){

            res.status(404).json({success:false, message:"User not found"})
        }

        let book = new Booking ({

            tourName, 
            userEmail, 
            fullName, 
            guestSize, 
            phone, 
            bookAt
        })

        await book.save();

        res.status(200).json({success:true, message:"Tour Booked Successfully!"});

    }catch(error){

        res.status(404).json({success:false, message:"Unable to book"})

    }
}

export const getAllBooking = async () => {

    try{

        const booking = await Booking.find();

        res.status(200).json({success:true, message:"Booking Details Found!", data:booking})

    }catch(error){

        res.status(404).json({success:false, message:"Booking not Found!"})

    }

}

export const getBooking = async (req, res, next) => {

    const bookingId = req.params.userId

    try{

        const booking = await Booking.findById(bookingId);

        if(!booking){

            return res.status(404).json({success:false, message:"Booking not found!"});
        }

            res.status(200).json({success:true, message:"Booking Found!"})


    }catch(error){

        res.status(500).json({success:false, message:"Internal serevr error"})

    }
}