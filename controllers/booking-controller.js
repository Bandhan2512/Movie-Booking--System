import Booking from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const addBooking = async (req,res,next) => {
    const {movie,date,seatNumber, user} = req.body;

    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch(e){
        return console.log(e);
    }

    if(!existingMovie){
        return res.status(500).json({message:"movie not found"});
    }
    if(!existingUser){
        return res.status(500).json({message:"user not found with the id"});
    }
    let newBooking;
    try{
        newBooking = new Booking(
            {
                movie,
                date:new Date(`${date}`),
                seatNumber,
                user
            }
        );
        const session = await mongoose.startSession();
        existingUser.bookings.push(newBooking);
        existingMovie.bookings.push(newBooking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await newBooking.save({session});
        await session.commitTransaction();
    }
    catch(e){
        return console.log(e);
    }
    if(!newBooking){
        return res.status(500).json({message:"booking failed"});
    }
    return res.status(201).json({message:"Booked successfully",newBooking});
}

export const getBookings = async (req,res,next) => {
    const id = req.params.id;
    let bookings;
    try{
        bookings = await Booking.findById(id);
    }
    catch(e){
        return console.log(e);
    }
    if(!bookings){
        return res.status(500).json({message:"No bookings found"});
    }
    return res.status(200).json({bookings});
}

export const deleteBooking = async (req,res,next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findByIdAndDelete(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        await session.commitTransaction();
    }
    catch(E){
        return console.log(E);
    }
    if(!booking){
        res.status(500).json({message:"error occured"});
    }
    res.status(200).json({message:"deleted successfully"});
}
