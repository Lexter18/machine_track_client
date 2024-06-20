import { NavLink } from "react-router-dom";


export const UserRow = ({ user }) => {
    const { state } = user;
    const { firstName, middleName, firstSurname, secondSurname, identificationType,  identification} = user.employee;
    const fullName = `${firstName} ${middleName} ${firstSurname} ${secondSurname}`.trim();
    const identificationView = `${identificationType} ${identification}`.trim();

    return (
        <tr>
            <td>{user.userName}</td>
            <td>{fullName}</td>
            <td>{identificationView}</td>
            <td>{user.role.role}</td>
            <td>{state && state.state}</td>
            <td>
                <NavLink className={'bi bi-pencil-fill'}
                    to={'/users/edit/' + user.idUser} >
                    
                </NavLink>
            </td>

        </tr>
    );

}