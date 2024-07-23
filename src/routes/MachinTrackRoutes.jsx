import {Navigate, Route, Routes} from "react-router-dom"
import {Navbar} from "../components/layout/Navbar"
import {MachinTrackProvider} from "../context/MachinTrackProvider"
import {SideBar} from "../components/layout/SideBar"
import {UsersPage} from "../pages/user/manage/UsersPage.jsx"
import {WorkPage} from "../pages/analysis/operation/WorkPage.jsx";
import {MachinePage} from "../pages/analysis/operation/MachinePaga.jsx";
import {OwnerUserPage} from "../pages/user/manageOwners/OwnerUserPage.jsx";
import {ROLES} from "../utils/constants.js";
import {getRol} from "../utils/utils.js";
import {ProtectedRoute} from "../utils/routeUtils.jsx";
import {UserDetails} from "../pages/user/UserDetails.jsx";


export const MachinTrackRoutes = () => {

    const userRole = getRol()


    return (
        <>
            <MachinTrackProvider>
                <Navbar/>
                <SideBar/>
                <Routes>
                    <Route path="users/list"
                           element={<ProtectedRoute element={UsersPage} roles={[ROLES.OWNER.name]} userRole={userRole}/>}/>
                    <Route path="operation/work"
                           element={<ProtectedRoute element={WorkPage} roles={[ROLES.OWNER.name]} userRole={userRole}/>}/>
                    <Route path="operation/machine"
                           element={<ProtectedRoute element={MachinePage} roles={[ROLES.OWNER.name]} userRole={userRole}/>}/>

                    <Route path="users/owners" element={<ProtectedRoute element={OwnerUserPage} roles={[ROLES.ADMIN.name]}
                                                                        userRole={userRole}/>}/>
                    <Route path="users/owners/details/:userId" element={<ProtectedRoute element={UserDetails} roles={[ROLES.ADMIN.name]}
                                                                        userRole={userRole}/>}/>

                    <Route path="/*" element={<Navigate to="/home"/>}/>
                </Routes>
            </MachinTrackProvider>
        </>
    )

}