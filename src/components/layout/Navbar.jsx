import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {

    const { login, handlerLogout } = useContext(AuthContext);
    return (
        <header id="header" className="bg-white border-bottom border-light-subtle sticky-top bsb-tpl-header-sticky">
            <nav className="navbar navbar-expand-md bsb-navbar-3 bsb-tpl-navbar-sticky" data-bsb-sticky-target="#header">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item me-3">
                            <a className="nav-link" href="#!" data-bs-toggle="offcanvas" data-bs-target="#bsbSidebar1" aria-controls="bsbSidebar1">
                                <i className="bi-filter-left fs-3 lh-1"></i>
                            </a>



                        </li>
                    </ul>                    

                    <Link to="/home" className="navbar-brand" aria-current="page">
                        <img src="/src/assets/img/branding/console-logo.svg" className="bsb-tpl-logo" alt="BootstrapBrain Logo" />
                    </Link>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#bsbNavbar" aria-controls="bsbNavbar" aria-label="Toggle Navigation">
                        <i className="bi bi-three-dots"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="bsbNavbar">
                        <ul className="navbar-nav bsb-dropdown-menu-responsive ms-auto align-items-center">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/src/assets/img/profile/profile-img-1.jpg" width="35" height="35" className="img-fluid rounded-circle" alt="Ethan Leo" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
                                    <li>
                                        <h6 className="dropdown-header fs-7 text-center">Welcome, Ethan Leo</h6>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a href="pages-profile.html" className="dropdown-item" aria-current="true">
                                            <div className="row g-0 align-items-center">
                                                <div className="col-3">
                                                    <img src="/src/assets/img/profile/profile-img-1.jpg" width="55" height="55" className="img-fluid rounded-circle" alt="Ethan Leo" />
                                                </div>
                                                <div className="col-9">
                                                    <div className="ps-3">
                                                        <div className="text-secondary mt-1 fs-7">Premium Account</div>
                                                        <div className="text-secondary mt-1 fs-7">leo@example.com</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="pages-profile.html">
                                            <span>
                                                <i className="bi bi-person-fill me-2"></i>
                                                <span className="fs-7">View Profile</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item text-center" href="auth-logout.html">
                                            <span>
                                                <span onClick={handlerLogout}
                                                    className="fs-7">Log Out</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>

        </header>
    );

}