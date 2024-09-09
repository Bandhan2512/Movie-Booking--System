import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req,res,next) => {
    let users;
    try{
        users = await User.find();
    }
    catch (e){ 
        return console.log(e);
    }
    if(!users){
        return res.status(500).json({ message : "Error occured broo"});
    }
    return res.status(200).json({users});
}

export const signup = async (req,res,next) => {
    const {name,email,password} = req.body.inputs;
    if(!name || !email || !password){
        return res.status(422).json({message : "Provide inputs correctly"});
    }
    const newpassword = bcrypt.hashSync(password); 
    let user;
    try{
        user = new User({name,email,password: newpassword});
        user = await user.save();
    }
    catch (e) {
        return console.log(e);
    }
    if(!user){
        return res.status(500).json({message : "Error occured"});
    }
    return res.status(201).json({id: user._id});
}

export const updateUser = async (req,res,next) => {
    const id = req.params.id;
    const {name ,email, password } = req.body;
    if(!name || !email || !password){
        return res.status(422).json({message : "provide inputs correctly lawdee"});
    }
    let user;
    const newpassword = bcrypt.hashSync(password);
    try{
        user = await User.findByIdAndUpdate(id,{name,email,password:newpassword});
    }
    catch(err){
        return console.log(err);
    }
    if(!user)
        return res.status(500).json({message:"Something went wrong"});
    res.status(200).json({user});
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error deleting user", error: err.message });
    }
    
    return res.status(200).json({ message: "Deleted successfully" });
};
    

export const login = async (req,res,next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({message : "provide inputs correctly lawdee"});
    }
    let euser;
    try{
        euser = await User.findOne({email});
    }
    catch (err){
        return console.log(err);
    }
    if(!euser){
        return res.status(404).json({message:"not a valid user"});
    }
    const crctpwd = bcrypt.compareSync(password,euser.password);
    if(crctpwd){
        return res.status(200).json({message: "Login successfull"});
    }
    return res.status(422).json({message:"Invalid credentials"});
}

export const getBookingsOfUser = async (req,res,next) => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.find({user:id});
    }
    catch(e){
        return console.log(e);
    }
    if(!booking){
        return res.status(500).json({message:"error booking finds"});
    }
    return res.status(200).json({message:"yeah showing",booking});
}

export const getUserById = async (req,res,next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);
    }
    catch (e){ 
        return console.log(e);
    }
    if(!user){
        return res.status(500).json({ message : "Error occured broo"});
    }
    return res.status(200).json({user});
}


