import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.Schema({

    idSecurity: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type : Number,
        default: 0
    }
}, {timestamps: true});



User.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

User.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

User.methods.getJwtToken = function(){
    const token = jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
    return token;
}

export default mongoose.model('Users', User);