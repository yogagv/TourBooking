import User from "../models/UserSchema.js";


//getAllUser
export const allUsers = async (req, res, next) => {

    try {

        const users = await User.find();
        res.status(200).json({ success: true, message: "Users Found Successfully!", data: users })
        console.log(users)
    } catch (error) {

        res.status(404).json({ success: false, message: "No User Found!" });
    }

}

//getSingleUserById

export const getSingleUser = async (req, res, next) => {

    const userId = req.userId;

    try {

        const user = await User.findById(userId);
        if (!user) {

            return res.status(404).send({ success: false, message: "User not found!" })
        }

        const { password, ...rest } = user._doc;

        res.status(200).send({ success: true, message: "User Found", data: { ...rest } })

    } catch (error) {
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

//updateUser

export const profileUpdate = async (req, res, next) => {

    const id = req.params.id;

    try{

        const profileUpdate = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true});

        res.status(200).json({success:true, message:"Profile Updated!", data: profileUpdate});

    }catch(error){

        res.status(404).json({success:false, message:"User not found"});
    }
}

//deleteUser 

export const profileDelete = async(req, res, next) => {

    const userid = req.params.id;

    try{

        if(!userid){

            res.status(404).json({sucess:false, message:"User not found!"})
        }
        

                await User.findByIdAndDelete(userid);
        
        res.status(200).json({success:true, message:"UserDeleted Successfully!"});
        
    }catch(error){

        res.status(500).json({success:false, message:"Failed to delete user"})
    }

}