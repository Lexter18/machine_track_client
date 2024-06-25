import {useContext, useState} from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../auth/context/AuthContext";
import {IDENTIFICATION_TYPES} from "../../utils/constants";

export const RegisterBody = () => {

    const {
        roles,
        countries,
        departments,
        municipalities,
        fetchDepartments,
        fetchMunicipalities,
        isDepartmentDisabled,
        setIsDepartmentDisabled,
        isMunicipalityDisabled,
        setIsMunicipalityDisabled
    } = useContext(AuthContext);

    const [selectedCountry, setSelectedCountry] = useState("0");
    const [selectedDepartment, setSelectedDepartment] = useState("0");

    // console.log("ROLES = ", JSON.stringify(roles, null, 2))
    // console.log("CONUNTRY = ", JSON.stringify(countries, null, 2))

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        setSelectedCountry(countryId);
        if (countryId === "0") {
            setIsDepartmentDisabled(true);
        } else {
            fetchDepartments(countryId);
        }
    };

    const handleDepartmentChange = (event) => {
        const departmentId = event.target.value;
        setSelectedDepartment(departmentId);
        if (departmentId === "0") {
            setIsMunicipalityDisabled(true);
        } else {
            fetchMunicipalities(departmentId);
        }
    };

    const onInputChange = ({target}) => {

    }

    const onSubmit = (event) => {

    }

    const onCloseForm = () => {

    }

    return (
        <section className="bg-light pb-3 pb-md-4 pb-xl-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="row gy-3 gy-md-4">
                        <div className="col-12">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center mb-3">
                                        <a href="index.html">
                                            <img src="/src/assets/img/branding/console-logo.svg"
                                                 alt="BootstrapBrain Logo" width="175" height="57"/>
                                        </a>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Ingresa tus datos
                                        para registrarte</h2>


                                    <div className="card-body p-4">
                                        <form className="row g-3" onSubmit={onSubmit}>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control form-control-sm"
                                                           name="firstname"
                                                           id="firstname"
                                                           placeholder="Primer Nombre"
                                                           required/>
                                                    <label htmlFor="firstname" className="form-label">Primer
                                                        Nombre</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="middlename"
                                                           id="middlename"
                                                           placeholder="Segundo Nombre"
                                                    />
                                                    <label htmlFor="middlename" className="form-label">Segundo
                                                        Nombre</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="lastname"
                                                           id="lastname"
                                                           placeholder="Primer Apellido"
                                                           required/>
                                                    <label htmlFor="lastname" className="form-label">Primer
                                                        Apellido</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="secondsurname"
                                                           id="secondsurname"
                                                           placeholder="Segundo Apellido"
                                                    />
                                                    <label htmlFor="secondsurname"
                                                           className="form-label">Segundo Apellido</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input type="email"
                                                           className="form-control"
                                                           name="email"
                                                           id="email"
                                                           placeholder="name@example.com"
                                                           onChange={onInputChange}
                                                           required/>
                                                    <label htmlFor="email"
                                                           className="form-label">Email</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="phone"
                                                           placeholder="# Celular"
                                                           required/>
                                                    <label htmlFor="phone"
                                                           className="form-label"># Celular</label>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-floating mb-3">
                                                    <select className="form-select mb-3" defaultValue="0">
                                                        <option value="0">Seleccione</option>
                                                        {IDENTIFICATION_TYPES.map((type) => (
                                                            <option key={type.value}
                                                                    value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Tipo Identificacion</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="identification"
                                                           placeholder="Numero Identificacion"
                                                           required/>
                                                    <label htmlFor="identification"
                                                           className="form-label">Numero Identificacion</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select mb-3"
                                                        value={selectedCountry}
                                                        onChange={handleCountryChange}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {countries.map((country) => (
                                                            <option key={country.idCountry}
                                                                    value={country.idCountry}>{country.name}</option>
                                                        ))}
                                                    </select>

                                                    <label className="form-label">Pais</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select mb-3"                                                                                                                disabled={isDepartmentDisabled}
                                                        value={selectedDepartment}
                                                        onChange={handleDepartmentChange}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {departments.map((department) => (
                                                            <option key={department.idDepartment}
                                                                    value={department.idDepartment}>
                                                                {department.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Departamento</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select mb-3"
                                                        defaultValue="0"
                                                        disabled={isMunicipalityDisabled}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {municipalities.map((municipality) => (
                                                            <option key={municipality.idMunicipality}
                                                                    value={municipality.idMunicipality}>
                                                                {municipality.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Municipio</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="username"
                                                           placeholder="Usuario"
                                                           onChange={onInputChange}
                                                           required/>
                                                    <label htmlFor="username"
                                                           className="form-label">Usuario</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input type="password"
                                                           className="form-control"
                                                           name="password"
                                                           id="password"
                                                           placeholder="Password"
                                                           onChange={onInputChange}
                                                           required/>
                                                    <label htmlFor="password"
                                                           className="form-label">Password</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input type="password"
                                                           className="form-control"
                                                           name="confirmpassword"
                                                           id="confirmpassword"
                                                           placeholder="Confirmar Password"
                                                           required/>
                                                    <label htmlFor="confirmpassword"
                                                           className="form-label">Confirmar Password</label>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select className="form-select mb-3" defaultValue="0">
                                                        <option value="0">Seleccione</option>
                                                        {roles.map((role) => (
                                                            <option key={role.idRole}
                                                                    value={role.idRole}>{role.role}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Rol</label>
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value=""
                                                           name="iAgree" id="iAgree"/>
                                                    <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                        Estoy de acuerdo con <a href="#!"
                                                                                className="link-primary text-decoration-none">los
                                                        terminos y condiciones</a>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="submit">
                                                        Registrate
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <p className="m-0 text-secondary text-center">¿Ya tienes una
                                                    cuenta? <Link to="/login"
                                                                  className="link-primary text-decoration-none">Login</Link>
                                                </p>
                                            </div>

                                        </form>
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