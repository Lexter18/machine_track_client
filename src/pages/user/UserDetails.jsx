import {UserForm} from "../../components/users/UserForm.jsx";
import {useLocation} from "react-router-dom";


export const UserDetails = () => {

    const location = useLocation();
    const {user} = location.state;

    return (
        <>
            <UserForm user={user}/>
        </>
    );

}