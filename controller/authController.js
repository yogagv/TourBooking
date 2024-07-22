import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2d" }
    );
};
export const registerUser = async (req, res, next) => {
    const { email, name, password, phone, role } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            res.status(400).json({ success: false, message: "User already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({
            email,
            name,
            password: passwordHash,
            phone,
            role,
        });

        await user.save();

        res
            .status(200)
            .json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

export const userLogin = async (req, res, next) => {

    const { email } = req.body;

    try {
        let user = await  User.findOne({ email: email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }

        console.log(user)

        const isPasswordMatch = await bcrypt.compare( req.body.password, user.password );

        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Password" });
        }

        const token = generateToken(user);

        const { password, role, ...rest } = user._doc;

        res
            .status(200)
            .json({
                success: true,
                message: "Login Successful!", token,
                data:{...rest},
                role
            });

            console.log(token)

    } catch (error) {
        res.status(500).json({ success: false, message: "Login Failed!" });
        console.log(error)
    }
};

