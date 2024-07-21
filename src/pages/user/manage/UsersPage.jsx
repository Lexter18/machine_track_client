import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { UsersList } from "../../../components/users/UsersList.jsx";
import { MachinTrackContext } from "../../../context/MachinTrackContext.jsx";

export const UsersPage = () => {

    const {
        users,
        getUsers,
    } = useContext(MachinTrackContext);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <section className="py-3 py-md-4 py-xl-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="h4">Usuarios</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 fs-7">
                                    <li className="breadcrumb-item">
                                        <Link className="link-primary text-decoration-none" to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">Gestionar</li>
                                    <li className="breadcrumb-item active" aria-current="page">Listado De Empleados</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
                <div className="container">
                    <div className="row gy-3 gy-md-4">
                        <div className="col-12 col-lg-12">
                            <div className="row gy-3 gy-md-4">
                                <div className="col-12">
                                    <div className="card widget-card border-light shadow-sm">
                                        <div className="card-header bg-transparent p-4 border-light-subtle d-flex justify-content-end">
                                            <button className="btn btn-primary my-0" type="submit">Registrar Usuario</button>
                                        </div>
                                        <div className="card-body p-4">

                                            {users.length === 0
                                                ? <div className="alert alert-warning">No hay usuarios</div>
                                                : <UsersList />
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>

    )
}