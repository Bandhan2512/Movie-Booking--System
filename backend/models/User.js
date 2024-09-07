import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        required:true,
        minLength: 6,
        type: String,
    },
    bookings: [{type: mongoose.Types.ObjectId,ref:"Booking"}],
});

export default mongoose.model("User",userSchema);