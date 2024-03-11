import Users from "../models/UserModels.js";

export const getUsers = async (req, res) =>{
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const getUserById = async (req, res) =>{
    try {
        const users = await Users.findById(req.params.id);
        res.json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) =>{
    const user = new Users(req.body);
    try {
        const inserteduser = await user.save();
        res.status(200).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}