import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ inputs, signup: isAdmin ? false : isSignUp });
    };

    return (
        <Dialog open={true}>
            <Box sx={{ ml: 'auto', padding: 1 }}>
                <IconButton component={Link} to="/" aria-label="close">
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
            <Typography variant="h4" textAlign={"center"}>
                {isSignUp ? "Sign Up" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    width={400}
                    padding={5}
                    alignContent={"center"}
                >
                    {!isAdmin && isSignUp && (
                        <>
                            <FormLabel sx={labelStyle}>Name</FormLabel>
                            <TextField
                                margin='auto'
                                variant="standard"
                                type="text"
                                value={inputs.name}
                                onChange={handleChange}
                                name='name'
                            />
                        </>
                    )}
                    <FormLabel sx={labelStyle}>Email</FormLabel>
                    <TextField
                        margin='auto'
                        variant="standard"
                        value={inputs.email}
                        onChange={handleChange}
                        type="email"
                        name='email'
                    />
                    <FormLabel sx={labelStyle}>Password</FormLabel>
                    <TextField
                        margin='auto'
                        variant="standard"
                        type="password"
                        value={inputs.password}
                        onChange={handleChange}
                        name='password'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, borderRadius: 1, bgcolor: "#2b2d42" }}
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </Button>
                    {!isAdmin && (
                        <Button
                            onClick={() => setIsSignUp(!isSignUp)}
                            fullWidth
                            sx={{ mt: 2, borderRadius: 1 }}
                        >
                            Switch to {isSignUp ? "Login" : "Signup"}
                        </Button>
                    )}
                </Box>
            </form>
        </Dialog>
    );
};

AuthForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default AuthForm;
