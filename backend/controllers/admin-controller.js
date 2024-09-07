import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req,res,next) => {
    const {email,password} = req.body;
    let admin;
    try{
        admin = await Admin.findOne({email});
    }
    catch(e){
        return console.log(e);
    }
    if(admin){
        res.status(400).json({message:"already exists broo here"});
    }
    else{
        const encpassword = bcrypt.hashSync(password);
        admin = new Admin({email,password:encpassword});
        admin = await admin.save();
        return res.status(200).json({message:"signed up successfully",admin});
    }
}

export const adminlogin = async (req,res,next) => {
    const {email,password} = req.body;
    const id = req.params.id;
    let euser;
    try{
        euser = await Admin.findOne({email});
        if(!euser){
            return res.status(400).json({message:"user doesnt exist"});
        }
        const bulli = bcrypt.compareSync(password,euser.password);
        if(bulli){
            const token = jwt.sign({ id: euser._id},process.env.secret_key,{expiresIn:"7d",});
            return res.status(200).json({message:"login successfull",token,id:euser._id});
        }
        return res.status(404).json({message:"invalid password"});
    }
    catch(e){
        console.log(e);
    }
}

export const getAdmins = async (req,res,next) => {
    let admins;
    try{
        admins = await Admin.find();
    }
    catch(e){
        return console.log(e);
    }
    if(!admins){
        res.status(500).json({message:"No admins available"});
    }
    res.status(200).json({admins});
}