import {Navigate, Route, Routes} from "react-router-dom"
import {Navbar} from "../components/layout/Navbar"
import {MachinTrackProvider} from "../context/MachinTrackProvider"
import {Home} from "../pages/Home"
import {SideBar} from "../components/layout/SideBar"
import {UsersPage} from "../pages/user/manage/UsersPage.jsx"
import {WorkPage} from "../pages/analysis/operation/WorkPage.jsx";
import {MachinePage} from "../pages/analysis/operation/MachinePaga.jsx";
import {OwnerUserPage} from "../pages/user/manageOwners/OwnerUserPage.jsx";
import {ROLES} from "../utils/constants.js";
import {ProtectedRoute} from "../utils/ProtectedRoute.jsx";

export const MachinTrackRoutes = () => {

    const loginData = JSON.parse(sessionStorage.getItem('login'));
    const userRole = loginData ? loginData.rol.authority : null;

    return (
        <>
            <MachinTrackProvider>
                <Navbar/>
                <SideBar/>
                <Routes>
                    <Route path="users/list"
                           element={<ProtectedRoute element={UsersPage} roles={[ROLES.OWNER]} userRole={userRole}/>}/>
                    <Route path="operation/work"
                           element={<ProtectedRoute element={WorkPage} roles={[ROLES.OWNER]} userRole={userRole}/>}/>
                    <Route path="operation/machine"
                           element={<ProtectedRoute element={MachinePage} roles={[ROLES.OWNER]} userRole={userRole}/>}/>

                    <Route path="users/owners" element={<ProtectedRoute element={OwnerUserPage} roles={[ROLES.ADMIN]}
                                                                        userRole={userRole}/>}/>

                    <Route path="/*" element={<Navigate to="/home"/>}/>
                </Routes>
            </MachinTrackProvider>
        </>
    )

}