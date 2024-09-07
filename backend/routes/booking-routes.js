import express from "express";
const bookingRouter = express.Router();
import {addBooking ,getBookings,deleteBooking}  from "../controllers/booking-controller.js";
bookingRouter.post("/",addBooking);
bookingRouter.get("/:id",getBookings);
bookingRouter.delete("/:id",deleteBooking);
export default bookingRouter;
