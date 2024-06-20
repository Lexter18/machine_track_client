import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { MachinTrackRoutes } from "./routes/MachinTrackRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { RegisterPage } from "./pages/RegisterPage";


export const MachinTrackApp = () => {
    
    const { login } = useContext(AuthContext);
    return (
        <Routes>
            {
                login.isAuth
                    ? (
                        <Route path='/*' element={<MachinTrackRoutes />} />
                    )

                    : <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>

            }

        </Routes>
    );

}