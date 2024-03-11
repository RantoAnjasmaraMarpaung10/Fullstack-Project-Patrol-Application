import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema


const Input = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: true
    },
    image :{
        type : String,
        // required: true
    },
    latitude: {
        type: String,
        
    },
    longitude: {
        type: String,
        
    },
    status : {
        type: String,
        default: "Pending"
    },
    petugas: {
        type: String
    }
    // user : {
    //     type: ObjectId,
    //     ref: "Users",
    //     required: true
    // }
}, {timestamps: true});

export default mongoose.model('Inputs', Input);