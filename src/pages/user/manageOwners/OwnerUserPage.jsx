import {Link} from "react-router-dom";


export const OwnerUserPage = () => {

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
                                    <li className="breadcrumb-item">Gestionar Owners</li>
                                    <li className="breadcrumb-item active" aria-current="page">Listado De Owners</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )

}

