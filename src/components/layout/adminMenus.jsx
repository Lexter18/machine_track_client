import {Link} from "react-router-dom";

export const adminMenus = (closeOffcanvas) => (
    <>

        <li className="nav-item mt-3">
            <h6 className="py-1 text-secondary text-uppercase fs-7">Usuarios</h6>
        </li>

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#ownerSideBar" role="button"
               aria-expanded="false" aria-controls="ownerSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Gestionar Owners</span>
            </a>
            <div className="collapse" id="ownerSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Listado</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>

        <li className="nav-item mt-3">
            <h6 className="py-1 text-secondary text-uppercase fs-7">Configuracion</h6>
        </li>

    </>
)