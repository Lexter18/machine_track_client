import { useRef } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {

    const offcanvasRef = useRef(null);

    const closeOffcanvas = () => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    };

    return (
        <aside className="bsb-sidebar-1 offcanvas offcanvas-start" tabIndex="-1" id="bsbSidebar1" aria-labelledby="bsbSidebarLabel1" ref={offcanvasRef}>
            <div className="offcanvas-header">                
                <Link to="/home" className="sidebar-brand" onClick={closeOffcanvas}>
                    <img src="/src/assets/img/branding/console-logo.svg" id="bsbSidebarLabel1" className="bsb-tpl-logo" alt="BootstrapBrain Logo" />
                </Link>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body pt-0">
                <hr className="sidebar-divider mb-3" />
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link to="/home"
                            className="nav-link p-3 rounded"
                            aria-current="page"
                            onClick={closeOffcanvas} >
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-house"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Home</span>
                        </Link>
                    </li>

                    <li className="nav-item mt-3">
                        <h6 className="py-1 text-secondary text-uppercase fs-7">Analisis</h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link p-3" data-bs-toggle="collapse" href="#analisisSideBar" role="button" aria-expanded="false" aria-controls="analisisSideBar">
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-menu-button-wide-fill"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Operacion</span>
                        </a>
                        <div className="collapse" id="analisisSideBar">
                            <ul className="nav flex-column ms-4">
                                <li className="nav-item">
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Obras</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Maquinas</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link p-3" data-bs-toggle="collapse" href="#productividadSideBar" role="button" aria-expanded="false" aria-controls="productividadSideBar">
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-menu-button-wide-fill"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Productividad</span>
                        </a>
                        <div className="collapse" id="productividadSideBar">
                            <ul className="nav flex-column ms-4">
                                <li className="nav-item">
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Registro</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
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
                        <a className="nav-link p-3" data-bs-toggle="collapse" href="#operadoresSideBar" role="button" aria-expanded="false" aria-controls="operadoresSideBar">
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-card-heading"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Gestionar</span>
                        </a>
                        <div className="collapse" id="operadoresSideBar">
                            <ul className="nav flex-column ms-4">
                                <li className="nav-item">                                    
                                    <Link to="/users/list"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
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
                                        onClick={closeOffcanvas} >
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
                        <a className="nav-link p-3" data-bs-toggle="collapse" href="#maestroSideBar" role="button" aria-expanded="false" aria-controls="maestroSideBar">
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
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Gestion</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Creacion</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Tipos Maquinas</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Movimiento Maquinas</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Proveedores GPS</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Marcas</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link p-3" data-bs-toggle="collapse" href="#ubicacionSideBar" role="button" aria-expanded="false" aria-controls="ubicacionSideBar">
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-card-heading"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Ubicaciones</span>
                        </a>
                        <div className="collapse" id="ubicacionSideBar">
                            <ul className="nav flex-column ms-4">
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Paises</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Departamentos</span>
                                    </Link>
                                </li>
                                <li className="nav-item">                                    
                                    <Link to="/home"
                                        className="nav-link link-secondary"
                                        aria-current="page"
                                        onClick={closeOffcanvas} >
                                        <div className="nav-link-icon text-primary-emphasis">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                        <span className="nav-link-text">Municipios</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>
        </aside>


    );

}