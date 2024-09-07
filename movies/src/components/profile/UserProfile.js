import { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBooking, getUserDetails } from "../../api-helpers/api-helpers";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const UserProfile = () => {
    const [ bookings, setBookings] = useState();
    const [ user, setUser ] = useState();
    useEffect( () => {
        getUserBooking()
        .then((res) => setBookings(res.bookings)
        .catch((e) => console.log(e)));

        getUserDetails()
        .then((res) => setUser(res.user))
        .catch((e) => console.log(e));
    },[]);
    
    const handleDelete = (id) => {
        deleteBooking(id)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    };
    return (
    <Box width="100%" display="flex">
        <Fragment>
            { user && (
                    <Box flexDirection="column" justifyContent="center"  alignItems="center" width="30%" padding={3}>
                <AccountCircleIcon sx={{fontSize:'10rem' ,textAlign:'center' , ml:2}}/>
                <Typography padding={1} width={'auto'} textAlign={'center'} border={"1px solid #ccc"} borderRadius={5}> Name: {user.name }</Typography>
                <Typography padding={1} width={'auto'} textAlign={'center'} border={"1px solid #ccc"} borderRadius={5} mt={1}> Email: {user.email }</Typography>
            </Box> )}
            { bookings && (
                        <Box width="70%" display={'flex'} flexDirection={'column'}>
                            <Typography variant="h3" fontFamily={"verdana"} textAlign={"center"} padding={2}>Bookings</Typography>    
                                <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
                    <List>
                        {bookings.map((booking,index) => (
                            <ListItem sx={{bgcolor:'#00d386',color:'white',textAlign:'center',margin:1}}>
                                <ListItemText sx={{margin: 1,width:'auto',textAlign:'left'}}>
                                    Movie : {booking.movie.title}
                                </ListItemText>
                                <ListItemText sx={{margin: 1,width:'auto',textAlign:'left'}}>
                                    Seat : {booking.movie.seatNumber}
                                </ListItemText>
                                <ListItemText sx={{margin: 1,width:'auto',textAlign:'left'}}>
                                    Date : {new Date(booking.date).toDateString()}
                                </ListItemText>
                                <IconButton onClick={(id) => handleDelete(booking._id)} color="error"> 
                                    <DeleteIcon color="red"/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                                </Box>
                        </Box> 
                    )}
        </Fragment>
    </Box>
    );
};

export default UserProfile;