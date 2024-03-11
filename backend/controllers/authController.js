import Users from"../models/UserModels.js";
import ErrorResponse from "../utils/errorResponse.js";

export const signup = async (req, res, next) => {
    const { idSecurity } = req.body;
    const userExist = await Users.findOne({ idSecurity });
    if (userExist) {
        return next(new ErrorResponse("ID already registred", 400));
    }
    try {
        const user = await Users.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { idSecurity, password } = req.body
        //vallidation
        if (!idSecurity) {
            return next(new ErrorResponse("Please add an ID", 403));
        }
        if (!password) {
            return next(new ErrorResponse("Please add an password"), 403);
        }

        //check user id
        const user = await Users.findOne({ idSecurity });
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid password", 400));
        }

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async(user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
    .status(codeStatus)
        .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
        .json({
            success: true, 
            token, 
            user
        })
}


//log out

export const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    });
}


//user profile
export const userProfile = async (req, res, next) =>{
    const user = await Users.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}