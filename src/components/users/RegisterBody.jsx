import {useContext, useState} from "react";
import {Link} from "react-router-dom"
import {IDENTIFICATION_TYPES} from "../../utils/constants";
import {useForm} from "react-hook-form";
import {validationMessages} from "../../utils/validationMessages.js";
import {useUsers} from "../../hooks/useUsers.js";
import {LocationsContext} from "../../context/LocationsContext.jsx";

export const RegisterBody = () => {

    const {
        countries,
        departments,
        municipalities,
        fetchDepartments,
        fetchMunicipalities,
        isDepartmentDisabled,
        setIsDepartmentDisabled,
        isMunicipalityDisabled,
        setIsMunicipalityDisabled
    } = useContext(LocationsContext);

    // estado del formulario para validaciones
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        trigger,
        watch,
        setValue
    } = useForm({mode: 'onChange'});
    const {createUser} = useUsers();

    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [selectedDepartment, setSelectedDepartment] = useState("0");
    const [isAgreeChecked, setIsAgreeChecked] = useState(false);
    const password = watch('password');

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

    const onSubmit = async (data) => {
        //console.log(data);
        await createUser(data);
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
                                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className={`form-control form-control-sm ${errors.firstName ? 'is-invalid' : ''}`}
                                                           name="firstName"
                                                           id="firstName"
                                                           placeholder="Primer Nombre"
                                                           {...register('firstName', {required: true, minLength: 3})}
                                                           onBlur={() => trigger('firstName')}
                                                    />

                                                    <label htmlFor="firstName" className="form-label">Primer
                                                        Nombre </label>
                                                    {errors.firstName && <div className="invalid-feedback">
                                                        {errors.firstName.type === 'required' && validationMessages.firstName.required}
                                                        {errors.firstName.type === 'minLength' && validationMessages.firstName.minLength}
                                                    </div>}

                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="middleName"
                                                           id="middleName"
                                                           placeholder="Segundo Nombre"
                                                           {...register('middleName')}
                                                    />
                                                    <label htmlFor="middleName" className="form-label">Segundo
                                                        Nombre</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.firstSurname ? 'is-invalid' : ''}`}
                                                        name="firstSurname"
                                                        id="firstSurname"
                                                        placeholder="Primer Apellido"
                                                        {...register('firstSurname', {required: true, minLength: 3})}
                                                        onBlur={() => trigger('firstSurname')}
                                                    />
                                                    <label htmlFor="firstSurname" className="form-label">Primer
                                                        Apellido</label>
                                                    {errors.firstSurname && <div className="invalid-feedback">
                                                        {errors.firstSurname.type === 'required' && validationMessages.firstSurname.required}
                                                        {errors.firstSurname.type === 'minLength' && validationMessages.firstSurname.minLength}
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="secondSurname"
                                                           id="secondSurname"
                                                           placeholder="Segundo Apellido"
                                                           {...register('secondSurname')}
                                                    />
                                                    <label htmlFor="secondSurname"
                                                           className="form-label">Segundo Apellido</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        name="email"
                                                        id="email"
                                                        placeholder="name@example.com"
                                                        {...register('email', {
                                                            required: validationMessages.email.required,
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                                message: validationMessages.email.pattern
                                                            }
                                                        })}
                                                        onBlur={() => trigger('email')}
                                                    />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    {errors.email && <div className="invalid-feedback">
                                                        {errors.email.message}
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="# Celular"
                                                        {...register('phone', {
                                                            required: true,
                                                            pattern: /^[0-9]+$/,
                                                            minLength: 10,
                                                            maxLength: 10
                                                        })}
                                                        onBlur={() => trigger('phone')}
                                                    />
                                                    <label htmlFor="phone" className="form-label"># Celular</label>
                                                    {errors.phone && <div className="invalid-feedback">
                                                        {errors.phone.type === 'required' && validationMessages.phone.required}
                                                        {errors.phone.type === 'pattern' && validationMessages.phone.pattern}
                                                        {errors.phone.type === 'minLength' && validationMessages.phone.minLength}
                                                        {errors.phone.type === 'maxLength' && validationMessages.phone.maxLength}
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${
                                                            errors.identificationType ? "is-invalid" : ""
                                                        }`}
                                                        {...register("identificationType", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        defaultValue="0">
                                                        <option value="0">Seleccione</option>
                                                        {IDENTIFICATION_TYPES.map((type) => (
                                                            <option key={type.value}
                                                                    value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Tipo Identificacion</label>
                                                    {errors.identificationType && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.identificationType.required}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">

                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.identification ? 'is-invalid' : ''}`}
                                                        name="identification"
                                                        id="identification"
                                                        placeholder="Numero Identificacion"
                                                        {...register('identification', {
                                                            required: true,
                                                            pattern: /^[0-9]+$/,
                                                            minLength: 4,
                                                            maxLength: 10
                                                        })}
                                                        onBlur={() => trigger('identification')}
                                                    />
                                                    <label htmlFor="identification" className="form-label">Numero
                                                        Identificacion</label>
                                                    {errors.identification && <div className="invalid-feedback">
                                                        {errors.identification.type === 'required' && validationMessages.identification.required}
                                                        {errors.identification.type === 'pattern' && validationMessages.identification.pattern}
                                                        {errors.identification.type === 'minLength' && validationMessages.identification.minLength}
                                                        {errors.identification.type === 'maxLength' && validationMessages.identification.maxLength}
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${
                                                            selectedCountry === "0" ? "is-invalid" : ""
                                                        }`}
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
                                                    {selectedCountry === "0" && (
                                                        <div className="invalid-feedback">
                                                            Debe seleccionar un país
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select mb-3" disabled={isDepartmentDisabled}
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
                                                        {...register('idMunicipality')}
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
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                                        name="username"
                                                        id="username"
                                                        placeholder="Usuario"
                                                        {...register('username', {
                                                            required: validationMessages.username.required,
                                                            minLength: {
                                                                value: 4,
                                                                message: validationMessages.username.minLength
                                                            },
                                                            maxLength: {
                                                                value: 20,
                                                                message: validationMessages.username.maxLength
                                                            }
                                                        })}
                                                        onBlur={() => trigger('username')}
                                                    />
                                                    <label htmlFor="username" className="form-label">Usuario</label>
                                                    {errors.username && <div className="invalid-feedback">
                                                        {errors.username.message}
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3 position-relative">
                                                    <input
                                                        type="password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        {...register('password', {
                                                            required: true,
                                                            minLength: 8,
                                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
                                                        })}
                                                        onBlur={() => trigger('password')}
                                                    />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    {errors.password && <div className="invalid-feedback">
                                                        {errors.password.type === 'required' && validationMessages.password.required}
                                                        {errors.password.type === 'minLength' && validationMessages.password.minLength}
                                                        {errors.password.type === 'pattern' && validationMessages.password.pattern}
                                                    </div>}

                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                        name="confirmPassword"
                                                        id="confirmpassword"
                                                        placeholder="Confirmar Password"
                                                        {...register('confirmPassword', {
                                                            required: true,
                                                            validate: value => value === password || validationMessages.confirmPassword.match
                                                        })}
                                                        onBlur={() => trigger('confirmPassword')}
                                                    />
                                                    <label htmlFor="confirmpassword" className="form-label">Confirmar
                                                        Password</label>
                                                    {errors.confirmPassword && <div className="invalid-feedback">
                                                        {errors.confirmPassword.type === 'required' && validationMessages.confirmPassword.required}
                                                        {errors.confirmPassword.type === 'validate' && validationMessages.confirmPassword.match}
                                                    </div>}
                                                </div>
                                            </div>

                                            {/*<div className="col-md-3">*/}
                                            {/*    <div className="form-floating mb-3">*/}
                                            {/*        <select*/}
                                            {/*            className={`form-select mb-3 ${*/}
                                            {/*                errors.role ? "is-invalid" : ""*/}
                                            {/*            }`}*/}
                                            {/*            {...register("role", {*/}
                                            {/*                required: true,*/}
                                            {/*                validate: {*/}
                                            {/*                    notZero: (value) => value !== "0",*/}
                                            {/*                },*/}
                                            {/*            })}*/}
                                            {/*            defaultValue="0">*/}
                                            {/*            <option value="0">Seleccione</option>*/}
                                            {/*            {roles.map((role) => (*/}
                                            {/*                <option key={role.idRole}*/}
                                            {/*                        value={role.idRole}>{role.role}</option>*/}
                                            {/*            ))}*/}
                                            {/*        </select>*/}
                                            {/*        <label className="form-label">Rol</label>*/}
                                            {/*        {errors.role && (*/}
                                            {/*            <div className="invalid-feedback">*/}
                                            {/*                {validationMessages.role.required}*/}
                                            {/*            </div>*/}
                                            {/*        )}*/}
                                            {/*    </div>*/}

                                            {/*</div>*/}


                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="iAgree"
                                                        id="iAgree"
                                                        checked={isAgreeChecked}
                                                        onChange={(e) => setIsAgreeChecked(e.target.checked)}
                                                        required
                                                    />
                                                    <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                        Estoy de acuerdo con <a href="#!"
                                                                                className="link-primary text-decoration-none">los
                                                        términos y condiciones</a>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="submit"
                                                        disabled={!isValid || !isAgreeChecked}>
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