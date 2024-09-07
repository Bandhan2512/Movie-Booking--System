import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const addMovie = async (req,res,next) => {
    const extractedtoken = req.headers.authorization.split(" ")[1];
    if(!extractedtoken || extractedtoken.trim() === ""){
        return res.status(404).json({message:"Token Not Found"});
    }
    let adminid;
    jwt.verify(extractedtoken,process.env.secret_key,(err,decrypted) => {
        if(err){
            return console.log(err);
        }
        else{
            return adminid = decrypted.id;
        }
    });

    const {title,description,releaseDate,postUrl,featured,actors} = req.body;
    if(!title || !description || !releaseDate || !postUrl || !featured){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let movie;
    try{
        movie = new Movie({postUrl,title,description,releaseDate,featured,actors,admin:adminid});
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminid);
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();
    }
    catch(e){
        return console.log(e);
    }

    if(!movie){
        return res.status(500).json({message:"request failed movie not added"});
    }
    return res.status(201).json({message:"Movie create successfully !",movie});
};


export const getMovies = async (req,res,next) => {
    let movies;
    try{
        movies = await Movie.find();
    }
    catch(e){
        return console.log(e);
    }
    if(!movies){
        return res.status(500).json({message:"request failed"});
    }
    res.status(200).json({movies});
}

export const getMovieById = async (req,res,next) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await Movie.findById(id);
    }
    catch(e){
        return console.log(e);
    }
    if(!movie){
        return res.status(500).json({message: "invalid movie id"});
    }
    return res.status(200).json({movie});
}