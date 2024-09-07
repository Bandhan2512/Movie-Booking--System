import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
    const [movie,setMovie] = useState();
    const [ inputs ,setInputs] = useState({
        seatNumber:"",
        date:"",
    });
    const id = useParams().id;
    console.log(id);
    useEffect(() => {
        getMovieDetails(id)
        .then((res) => setMovie(res.movie))
        .catch((e) => console.log(e));
    },[id]);
    
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.value] : e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        newBooking({...inputs,movie:movie._id})
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    };

    return <div>
        {movie && (<Fragment>
                <Typography padding={3} fontFamily ={"fantasy"} variant="h4" textAlign="center">
                    Book Tickets of Movie : {movie.title};
                    <Box display="flex" justifyContent={"center"}>
                        <Box display={"flex"} justifyContent={"column"} flex-direction={"column"} paddingTop={3} width="50%" marginRight={"auto"}>
                            <img src={movie.posterUrl} alt={movie.title} width="80%" height="300px" />
                            <Box width="80%" marginTop={3} padding={2}>
                                <Typography paddingTop={2}> {movie.description} </Typography>
                                <Typography fontWeight={"bold"} marginTop={1}> Starrer: {movie.actors.map((actor) => " "+actor + " ")} </Typography>
                                <Typography fontWeight={"bold"} marginTop={1}> Release Date : {new Date(movie.releaseDate).toDateString()} </Typography>
                            </Box>
                        </Box>
                        <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} margin={'auto'} display={"flex"} flexDirection={"column"}>
                                    <FormLabel>Seat number</FormLabel>
                                    <TextField value ={inputs.seatNumber} onChange={handleChange} name="setNumber" type ={'number'} margin="normal" variant="standard"/>
                                    <FormLabel>Booking Date</FormLabel>
                                    <TextField value ={inputs.date} onChange={handleChange} name="date" type ={'date'} margin="normal" variant="standard"/>
                                    <Button type="submit" sx={{mt:3}}>Book Now</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Typography>
            
            </Fragment>
        )}
    </div>
};

export default Booking;