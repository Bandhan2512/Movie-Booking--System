import { useDispatch } from "react-redux";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import AuthForm from "./AuthForm";
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onResReceived = (data) => {
        dispatch(userActions.login());
        localStorage.setItem("userId",data.id);
        navigate("/");
    };
    const getData = (data) => {
        console.log(data);
        sendUserAuthRequest(data.inputs,data.signup)
        .then(onResReceived)
        .catch((e) => console.log(e));
    };
    return <div>
        <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
}

export default Auth;