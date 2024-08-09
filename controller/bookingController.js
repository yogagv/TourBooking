import Booking from '../models/BookingSchema.js'
import User from '../models/UserSchema.js'
import Tour from '../models/TourSchema.js'

export const createBooking = async (req, res, next) => {

    const {fullName, guestSize, phone, bookAt} = req.body

    try{

        const userId = req.userId;
        const tourId = req.params.tourId

        console.log("userId", userId);
        console.log("tourId", tourId);

        
        const user = await User.findById(userId);        
        const tour = await Tour.findById(tourId);


        console.log("Userfound", user)


        if(!user){

           return  res.status(404).json({success:false, message:"User not found!"})

           
        }

        console.log("userFound", user)

        if(!tour){

           return res.status(404).json({success:false, message:"tour not found!"})
           
        }


        let book = new Booking ({

            user: {
                id: userId,
            },
            tour: {
                id: tourId,
            },
            fullName, 
            guestSize, 
            phone, 
            bookAt
        })

        await book.save();

        res.status(200).json({success:true, message:"Tour Booked Successfully!", data: book});

    }catch(error){

        res.status(404).json({success:false, message:"Unable to book"})
        console.log(error.message)
    }
}

export const getAllBooking = async (req, res, next) => {

    try{

        const booking = await Booking.find();

        res.status(200).json({success:true, message:"Booking Details Found!", data:booking})

    }catch(error){

        res.status(404).json({success:false, message:"Booking not Found!"})

        

    }

}

export const getBooking = async (req, res, next) => {

    const userId = req.params.id;

    try{

        const booking = await Booking.find({user: userId});
       
        if(!booking){

            return res.status(404).json({success:false, message:"Booking not found!"});
        }

            res.status(200).json({success:true, message:"Booking Found!", data: booking});


    }catch(error){

        res.status(500).json({success:false, message:"Internal serevr error"})

        console.log(error.message);

    }
}