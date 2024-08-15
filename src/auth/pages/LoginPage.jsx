import {useContext, useState} from "react";
import Swal from "sweetalert2";
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";


const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const {handlerLogin} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const {username, password} = loginForm;
    const onInputChange = ({target}) => {
        const {name, value} = target;
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

        handlerLogin({username, password});
        setLoginForm(initialLoginForm);
    }


    return (
        <div className="wrapper">
            <div className="m-account-w bg--img" style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2)),
                 url('/src/assets/img/account/wrapper-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="m-account">
                    <div className="row no-gutters">
                        <div className="col-md-6">
                            <div className="m-account--content-w bg--img"
                                 style={{
                                     backgroundImage: `url('/src/assets/img/account/content-bg.jpg')`
                                 }}
                                 >
                                <div className="m-account--content">
                                    <h2 className="h2">¿No tienes una cuenta?</h2>
                                    <p>Has parte del futuro</p>
                                    <Link to="/register" className="btn btn-rounded btn-info">Registrate Ahora</Link>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="m-account--form-w">
                                <div className="m-account--form">

                                    <div className="logo">
                                        <img src="/src/assets/img/logo.png" alt=""/>
                                    </div>


                                    <form onSubmit={onSubmit}>
                                        <label className="m-account--title">¡Bienvenido de nuevo!</label>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <i className="fas fa-user"></i>
                                                </div>

                                                <input
                                                    className="form-control"
                                                    name="username"
                                                    id="username"
                                                    placeholder="Usuario"
                                                    value={username}
                                                    onChange={onInputChange}
                                                    required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <i className="fas fa-key"></i>
                                                </div>

                                                <input type="password"
                                                       className="form-control"
                                                       name="password"
                                                       id="password"
                                                       value={password}
                                                       onChange={onInputChange}
                                                       placeholder="Password"
                                                       required/>
                                            </div>
                                        </div>

                                        <div className="m-account--actions">
                                            <a href="#" className="btn-link">¿ Olvidaste tu Password ?</a>

                                            <button type="submit" className="btn btn-rounded btn-info">Login</button>
                                        </div>

                                        <div className="m-account--footer">
                                            <p>&copy; nexo</p>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
        ;


}