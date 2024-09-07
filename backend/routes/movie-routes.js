import express from "express";
const movieRouter = express.Router();
import {addMovie,getMovies,getMovieById} from "../controllers/movie-controller.js"


movieRouter.post("/",addMovie);
movieRouter.get("/",getMovies);
movieRouter.get("/:id",getMovieById);


export default movieRouter;