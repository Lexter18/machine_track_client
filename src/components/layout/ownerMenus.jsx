import {Link} from "react-router-dom";

export const ownerMenus = (closeOffcanvas) => (
    <>
        <li className="nav-item mt-3">
            <h6 className="py-1 text-secondary text-uppercase fs-7">Analisis</h6>
        </li>
        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#analisisSideBar" role="button"
               aria-expanded="false" aria-controls="analisisSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-menu-button-wide-fill"></i>
                </div>
                <span className="nav-link-text fw-bold">Operacion</span>
            </a>
            <div className="collapse" id="analisisSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="operation/work"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Gestion</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#productividadSideBar" role="button"
               aria-expanded="false" aria-controls="productividadSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-menu-button-wide-fill"></i>
                </div>
                <span className="nav-link-text fw-bold">Productividad</span>
            </a>
            <div className="collapse" id="productividadSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/Registro"
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
                        <Link to="/Resultados"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Resultados</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>

        <li className="nav-item mt-3">
            <h6 className="py-1 text-secondary text-uppercase fs-7">Usuarios</h6>
        </li>

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#operadoresSideBar" role="button"
               aria-expanded="false" aria-controls="operadoresSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Internos</span>
            </a>
            <div className="collapse" id="operadoresSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/users/list"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Listado</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Creacion"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Creacion</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#customerSideBar" role="button"
               aria-expanded="false" aria-controls="operadoresSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Clientes</span>
            </a>
            <div className="collapse" id="customerSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/users/list"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Listado</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Creacion"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Creacion</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>

        <li className="nav-item mt-3">
            <h6 className="py-1 text-secondary text-uppercase fs-7">Configuracion</h6>
        </li>
        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#maestroSideBar" role="button"
               aria-expanded="false" aria-controls="maestroSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Maquinas</span>
            </a>
            <div className="collapse" id="maestroSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/home"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Listado</span>
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
                            <span className="nav-link-text">Creacion</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </li>

        <li className="nav-item">
            <a className="nav-link p-3" data-bs-toggle="collapse" href="#workSideBar" role="button"
               aria-expanded="false" aria-controls="maestroSideBar">
                <div className="nav-link-icon text-primary">
                    <i className="bi bi-card-heading"></i>
                </div>
                <span className="nav-link-text fw-bold">Obras</span>
            </a>
            <div className="collapse" id="workSideBar">
                <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                        <Link to="/home"
                              className="nav-link link-secondary"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary-emphasis">
                                <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <span className="nav-link-text">Listado</span>
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
                            <span className="nav-link-text">Creacion</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </li>


    </>
)