import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { MachinTrackProvider } from "../context/MachinTrackProvider"
import { Home } from "../pages/Home"
import { SideBar } from "../components/layout/SideBar"
import { UsersPage } from "../pages/user/UsersPage"

export const MachinTrackRoutes = () => { 

    return (
        <>
            <MachinTrackProvider>
                <Navbar />
                <SideBar />
                <Routes>
                    <Route path="home" element={<Home />} />                
                    <Route path="users/list" element={<UsersPage />} />                                  
                    <Route path="/*" element={<Navigate to="/home" />} />
                </Routes>
            </MachinTrackProvider>
        </>
    )

}