import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer")){

        return res.status(401).json({success:false, message:"No token, Authorization denied"});
    }


    try{

        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id;
        req.role = decoded.role;
        next();


    }catch(error){

        if(error.name === "TokenExpiredError"){

            return res.status(401).json({success:false, message:"Token expired"})
          }
              return res.status(401).json({success:false, message:"Invalid Token"})

    }
}


export const restrict = (role) => async (req, res, next) => {

    try{

        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user){

            res.status(404).json({success:false, message:"User not Found!"});
        }

        const userRole = user.role

        if(userRole === "user" && role.includes("user")){

            next();
        } else if(userRole === "admin" && role.includes("admin")) {

            next();

        }else {
            return res.status(401).json({success:false, message:"You are not authorized!"})
        }  

        console.log(userRole);

    }catch(error){

        return res.status(500).json({success:false, message:"Internal server error"});

    }

}