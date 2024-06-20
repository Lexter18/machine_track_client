import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const { handlerLogin } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requridos', 'error');
        }

        handlerLogin({ username, password });
        setLoginForm(initialLoginForm);
    }


    return (
        <section className="bg-light p-4 p-md-4 p-xl-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xxl-11">
                        <div className="card border-light-subtle shadow-sm">
                            <div className="row g-0">
                                <div className="col-12 col-md-6">
                                    <img className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                                        loading="lazy"
                                        src="https://bootstrapbrain.com/demo/components/logins/login-8/assets/img/logo-img-1.webp"
                                        alt="Welcome back you've been missed!" />
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="col-12 col-lg-11 col-xl-10">
                                        <div className="card-body p-3 p-md-4 p-xl-5">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-5">
                                                        <div className="text-center mb-4">
                                                            <a href="#!">
                                                                <img src="https://bootstrapbrain.com/demo/components/logins/login-8/assets/img/bsb-logo.svg"
                                                                    alt="BootstrapBrain Logo"
                                                                    width="175"
                                                                    height="57" />
                                                            </a>
                                                        </div>
                                                        <h4 className="text-center">¡Bienvenido de nuevo!</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <form onSubmit={onSubmit}>
                                                <div className="row gy-3 overflow-hidden">
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                className="form-control"
                                                                name="username"
                                                                id="username"
                                                                placeholder="Usuario"
                                                                value={username}
                                                                onChange={onInputChange}
                                                                required />
                                                            <label htmlFor="username"
                                                                className="form-label">Usuario</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input type="password"
                                                                className="form-control"
                                                                name="password"
                                                                id="password"
                                                                value={password}
                                                                onChange={onInputChange}
                                                                placeholder="Password"
                                                                required />
                                                            <label htmlFor="password"
                                                                className="form-label">Password</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                                                            <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                                Keep me logged in
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-dark btn-lg" type="submit">Login</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                                                        <p className="m-0 text-secondary text-center">¿No tienes una cuenta? <Link to="/register" className="link-primary text-decoration-none">Registrate</Link></p>
                                                        <p className="m-0 text-secondary text-center"><Link to="/register" className="link-primary text-decoration-none">¿Olvidaste tu contraseña?</Link></p>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );




}