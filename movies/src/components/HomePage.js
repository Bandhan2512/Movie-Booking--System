import { Box, Button, Typography } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import React ,{ useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";


const HomePage = () => {


    const [movies,setMovies] = useState([]);
    useEffect(() => {
        getAllMovies().then((data)=> setMovies(data.movies)).catch((e) => console.log(e))
    },[]);

    return <Box width='100%' height='100%' margin='auto' marginTop={1} >
        <Box width='80%' height='45vh' margin='auto' padding={2}>
            <img 
                src="https://i.ytimg.com/vi/ZXNr0KZfK40/maxresdefault.jpg" 
                alt="kalki" 
                width='100%' 
                height='100%' />

        </Box>
        <Box padding={5} margin='auto'>
            <Typography variant="h4" textAlign="center">
                Latest Releases
            </Typography>
        </Box>
        <Box display={"flex"} width="85%" justifyContent={"center"} flexWrap={"wrap"} margin='auto'>
            {movies && movies.slice(0,4).map((movie,index) => (
                <MovieItem 
                id={movie.id} 
                title={movie.title} 
                posterUrl={movie.posterUrl} 
                releaseDate={movie.releaseDate} 
                key={index} />
                ))
            }
        </Box>
        <Box display="flex" justifyContent={"center"} padding={5}>
            <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{color:"#2b2d42"}}>
                View All Movies
            </Button>
        </Box>
    </Box>
}

export default HomePage;