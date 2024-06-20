import { useContext } from "react";
import { MachinTrackContext } from "../../context/MachinTrackContext";
import { UserRow } from "./UserRow";


export const UsersList = () => {

    const { users = [] } = useContext(MachinTrackContext);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Identificacion</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <UserRow
                            key={user.idUser}
                            user={user}
                        />
                    ))
                }
            </tbody>
        </table>

    );

}