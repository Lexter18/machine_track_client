import {useContext} from "react";
import {AuthContext} from "../../auth/context/AuthContext";
import {Link} from "react-router-dom";

export const Navbar = () => {

    const {login, handlerLogout} = useContext(AuthContext);
    return (
        <div className="wrapper">
            <header className="navbar navbar-fixed">

                <div className="navbar--header">
                    <Link to="/home" className="logo">
                        <img src="/src/assets/img/logo.png" alt="Logo Nexo"/>
                    </Link>
                    <Link to="/home" className="navbar--btn" data-toggle="sidebar" title="Toggle Sidebar">
                        <i className="fa fa-bars"></i>
                    </Link>
                </div>


                <Link to="/home" className="navbar--btn" data-toggle="sidebar" title="Toggle Sidebar">
                    <i className="fa fa-bars"></i>
                </Link>

                <div className="navbar--search">
                    <form action="search-results.html">
                        <input type="search" name="search"
                               className="form-control"
                               placeholder="Search Something..." required
                        />
                        <button className="btn-link"><i className="fa fa-search"></i></button>
                    </form>
                </div>


                <div className="navbar--nav ml-auto">
                    <ul className="nav">
                        <li className="nav-item dropdown nav--user online">
                            <a href="#" className="nav-link" data-toggle="dropdown">
                                <img src="src/assets/img/avatars/01_80x80.png" alt="" className="rounded-circle"/>
                                <span>Henry Foster</span>
                                <i className="fa fa-angle-down"></i>
                            </a>

                            <ul className="dropdown-menu">
                                <li><a href="#"><i className="far fa-user"></i>Perfil</a></li>
                                <li><a href="#"><i className="fa fa-cog"></i>Configuracion</a></li>
                                <li className="dropdown-divider"></li>
                                <li>
                                    <Link to="/login">
                                        <i className="fa fa-power-off"> </i>
                                        <span onClick={handlerLogout}>Log Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </header>
        </div>
    );

}