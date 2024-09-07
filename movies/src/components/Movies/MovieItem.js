import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const MovieItem = ({title,releaseDate,posterUrl,id}) => {
    return (
    <Card sx={{
        margin:2,
        width: 250,
        height: 320,
        borderRadius:5,
        ":hover":{
            boxShadow: "20px 10px 20px #ccc"
        },
     }}>
    <img src={posterUrl} alt={title} height="50%" width="100%"/> 
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" fullWidth LinkComponent={Link} to={`/booking/${id}`} size="small" sx={{margin:"auto",bgcolor:"#2b2d42",":hover":{bgcolor:"#121217"},}}>Book</Button>
    </CardActions>
  </Card>
    );
};

export default MovieItem;