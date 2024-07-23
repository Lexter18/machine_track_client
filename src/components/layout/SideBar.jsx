import {useRef} from "react";
import {Link} from "react-router-dom";
import {ownerMenus} from "./ownerMenus.jsx";
import {adminMenus} from "./adminMenus.jsx";
import {ROLES} from "../../utils/constants.js";
import {getRol} from "../../utils/utils.js";

export const SideBar = () => {

    const offcanvasRef = useRef(null);
    const userRole = getRol()

    const closeOffcanvas = () => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    };

    return (
        <aside className="bsb-sidebar-1 offcanvas offcanvas-start" tabIndex="-1" id="bsbSidebar1"
               aria-labelledby="bsbSidebarLabel1" ref={offcanvasRef}>
            <div className="offcanvas-header">
                <Link to="/home" className="sidebar-brand" onClick={closeOffcanvas}>
                    <img src="/src/assets/img/branding/console-logo.svg" id="bsbSidebarLabel1" className="bsb-tpl-logo"
                         alt="BootstrapBrain Logo"/>
                </Link>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body pt-0">
                <hr className="sidebar-divider mb-3"/>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home"
                              className="nav-link p-3 rounded"
                              aria-current="page"
                              onClick={closeOffcanvas}>
                            <div className="nav-link-icon text-primary">
                                <i className="bi bi-house"></i>
                            </div>
                            <span className="nav-link-text fw-bold">Home</span>
                        </Link>
                    </li>
                    {userRole === ROLES.OWNER.name && ownerMenus(closeOffcanvas)}
                    {userRole === ROLES.ADMIN.name && adminMenus(closeOffcanvas)}

                </ul>
            </div>
        </aside>


    );

}