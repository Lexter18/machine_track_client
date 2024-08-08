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
                            <span className="nav-link-text">Registro</span>
                        </Link>
                    </li>

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

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#locationsSideBar" role="button"
               aria-expanded="false" aria-controls="locationsSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Ubicaciones</span>
            </a>
            <div className="collapse" id="locationsSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Paises</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Departamentos</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Municipios</span>
                        </Link>
                    </li>
                </ul>
            </div>


        </li>

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#machinesSideBar" role="button"
               aria-expanded="false" aria-controls="machinesSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Maquinas</span>
            </a>
            <div className="collapse" id="machinesSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Marcas</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Tipos</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link to="/users/owners"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Movimientos</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/home"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Proveedores GPS</span>
                        </Link>
                    </li>

                </ul>
            </div>


        </li>


    </>
)