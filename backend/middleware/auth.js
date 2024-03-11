import ErrorResponse from "../utils/errorResponse.js"
import jwt from "jsonwebtoken";
import Users from "../models/UserModels.js";

//check is user is authenticated

export const isAuthenticated = async (req, res, next)=>{
    console.log(req.body)
    const { token } = req.body;
    //make sure token exist
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Users.findById(decoded.id);
        next();
    } catch (error) {
        return next(error);
    }
}


//middleware for admin
export const isAdmin = (req, res, next) => {
    if(req.user.role === 0){
        return next(new ErrorResponse('Access denied, you must an admin', 401));
    }
    next();
}