import axios from "axios";
export const getAllMovies = async () => {
    const res = await axios
    .get("/movies")
    .catch((e) => console.log(e));
    
    if(res.status !== 200){
        return console.log("No Data Found");
    }
    const data = await res.data;
    return data;
}

export const sendUserAuthRequest = async (data, signup) => {
    try {
        const endpoint = signup ? 'signup' : 'login';
        const res = await axios.post(`http://localhost:3001/user/${endpoint}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password,
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Unexpected error occurred");
        }

        return res.data;
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        throw e;
    }
};


export const sendAdminAuthRequest  = async (data) => {
    const res = await axios.post("/admin/login",{
        email: data.email,
        password: data.password,
    })
    .catch((e) => console.log(e));

    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }
    const resData = await res.data;
    return resData;
}

export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }
    const resData = await res.data;
    return resData;
}

export const newBooking = async (data) => {
    const res = await axios.post('/booking/',{
        movie: data.movie,
        setNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId")
    }).catch((e) => console.log(e));

    if(res.status !== 201){
        return console.log("Unexpected error occured");
    }

    const resData = await res.data;
    return resData;
};

export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/bookings/${id}`).catch((e) => console.log(e));

    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }

    const resData = await res.data;
    return resData;
}

export const deleteBooking = async (id) => {
    const res = await axios
    .delete(`/booking/${id}`)
    .catch((e) => console.log(e));

    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }

    const resData = await res.data;
    return resData;
};

export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`)
    .catch((e) => console.log(e));

    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }

    const resData = await res.data;
    return resData;
};

export const addMovie = async (data) => {
    const res = await axios.post("/movie",{
        title: data.title,
        description : data.description,
        releaseDate : data.releaseDate,
        posterUrl : data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
    },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
    }).catch((e) => console.log(e));

    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }
    const resData = await res.data;
    return resData;
};

export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(`/admin/${adminId}`).catch((e) => console.log(e));
    if(res.status !== 200){
        return console.log("Unexpected error occured");
    }

    const resData = await res.data;
    return resData;
};