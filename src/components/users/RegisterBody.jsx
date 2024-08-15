import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import {IDENTIFICATION_TYPES, OWNER_IDENTIFICATION_TYPES} from "../../utils/constants";
import {useForm} from "react-hook-form";
import {validationMessages} from "../../utils/validationMessages.js";
import {useUsers} from "../../hooks/useUsers.js";
import {LocationsContext} from "../../context/LocationsContext.jsx";
import {InputFieldIcon} from "../common/InputFieldIcon.jsx";


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
        setValue,
        clearErrors
    } = useForm({mode: 'onChange'});
    const {createUser} = useUsers();

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isAgreeChecked, setIsAgreeChecked] = useState(false);
    const password = watch('password');

    // console.log("ROLES = ", JSON.stringify(roles, null, 2))
    // console.log("CONUNTRY = ", JSON.stringify(countries, null, 2))

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        setSelectedCountry(countryId);
        setValue("idLocation", countryId);
        setValue("idDepartment", "0");
        if (countryId === "0") {
            setIsDepartmentDisabled(true);
        } else {
            clearErrors("idLocation");
            fetchDepartments(countryId);
        }
        trigger("idLocation");
        trigger("idDepartment");
    };

    const handleDepartmentChange = (event) => {
        const departmentId = event.target.value;
        setSelectedDepartment(departmentId);
        setValue("idDepartment", departmentId);
        setValue("idMunicipality", "0");
        if (departmentId === "0") {
            setIsMunicipalityDisabled(true);
        } else {
            clearErrors("idDepartment");
            fetchMunicipalities(departmentId);
        }
        trigger("idDepartment");
        trigger("idMunicipality");
    };

    const onSubmit = async (data) => {
        //console.log(data);
        await createUser(data);
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
                    <div className="row no-gutters flex-row-reverse">

                        <div className="col-md-12">

                            <div className="m-account--form-w">
                                <div className="m-account--form m-account--form-regis">

                                    <div className="logo">
                                        <img src="/src/assets/img/logo.png" alt=""/>
                                    </div>
                                    <label className="m-account--title">Crea tu cuenta</label>


                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="Nombres"
                                                    name="firstName"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.firstName.required,
                                                        minLength: {
                                                            value: 3,
                                                            message: validationMessages.firstName.minLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-user"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="Apellidos"
                                                    name="firstSurname"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.firstSurname.required,
                                                        minLength: {
                                                            value: 3,
                                                            message: validationMessages.firstSurname.minLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-user"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="email"
                                                    label="Email"
                                                    name="email"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.email.required,
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                            message: validationMessages.email.pattern
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-envelope"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <i className="fas fa-id-card"></i>
                                                    </div>

                                                    <select
                                                        className={`form-control ${
                                                            errors.identificationType ? "is-invalid" : ""
                                                        }`}
                                                        {...register("identificationType", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        defaultValue="0">
                                                        <option value="0">Tipo Doc.</option>
                                                        {IDENTIFICATION_TYPES.map((type) => (
                                                            <option key={type.value}
                                                                    value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>

                                                    {errors.identificationType && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.identificationType.required}
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="# Identificacion"
                                                    name="identification"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.identification.required,
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: validationMessages.identification.pattern
                                                        },
                                                        minLength: {
                                                            value: 4,
                                                            message: validationMessages.identification.minLength
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: validationMessages.identification.maxLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-id-card"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="# Celular"
                                                    name="phone"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.phone.required,
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: validationMessages.phone.pattern
                                                        },
                                                        minLength: {
                                                            value: 10,
                                                            message: validationMessages.phone.minLength
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: validationMessages.phone.maxLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-mobile"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="Usuario"
                                                    name="username"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.username.required,
                                                        minLength: {
                                                            value: 4,
                                                            message: validationMessages.username.minLength
                                                        },
                                                        maxLength: {
                                                            value: 20,
                                                            message: validationMessages.username.maxLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"far fa-user"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="password"
                                                    label="Password"
                                                    name="password"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.password.required,
                                                        minLength: {
                                                            value: 8,
                                                            message: validationMessages.password.minLength
                                                        },
                                                        pattern: {
                                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                                            message: validationMessages.password.pattern
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-lock"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="password"
                                                    label="Confirmar Password"
                                                    name="confirmPassword"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.confirmPassword.required,
                                                        validate: value => value === password || validationMessages.confirmPassword.match
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-lock"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="Nombre / Razon Social"
                                                    name="ownerName"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.ownerName.required,
                                                        minLength: {
                                                            value: 3,
                                                            message: validationMessages.ownerName.minLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"far fa-building"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <i className="fas fa-id-card"></i>
                                                    </div>

                                                    <select
                                                        className={`form-control ${
                                                            errors.ownerIdentificationType ? "is-invalid" : ""
                                                        }`}
                                                        {...register("ownerIdentificationType", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        defaultValue="0">
                                                        <option value="0">Tipo Doc.</option>
                                                        {OWNER_IDENTIFICATION_TYPES.map((type) => (
                                                            <option key={type.value}
                                                                    value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>

                                                    {errors.ownerIdentificationType && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.ownerIdentificationType.required}
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <InputFieldIcon
                                                    type="text"
                                                    label="# Documento"
                                                    name="ownerIdentification"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{
                                                        required: validationMessages.ownerIdentification.required,
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: validationMessages.ownerIdentification.pattern
                                                        },
                                                        minLength: {
                                                            value: 8,
                                                            message: validationMessages.ownerIdentification.minLength
                                                        },
                                                        maxLength: {
                                                            value: 15,
                                                            message: validationMessages.ownerIdentification.maxLength
                                                        }
                                                    }}
                                                    readOnly={false}
                                                    autoComplete={"off"}
                                                    icon={"fas fa-id-card"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <i className="fa fa-location-arrow"></i>
                                                    </div>

                                                    <select
                                                        className={`form-control ${errors.idLocation ? "is-invalid" : ""}`}
                                                        {...register("idLocation", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        onChange={handleCountryChange}
                                                        value={selectedCountry}
                                                    >
                                                        <option value="0">Pais</option>
                                                        {countries.map((country) => (
                                                            <option key={country.idCountry}
                                                                    value={country.idCountry}>{country.name}</option>
                                                        ))}
                                                    </select>

                                                    {errors.idLocation && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredCountry}
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <i className="fa fa-location-arrow"></i>
                                                    </div>

                                                    <select
                                                        className={`form-control ${errors.idDepartment ? "is-invalid" : ""}`}
                                                        {...register("idDepartment", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        disabled={isDepartmentDisabled}
                                                        onChange={handleDepartmentChange}
                                                        value={selectedDepartment}
                                                    >
                                                        <option value="0">Departamento</option>
                                                        {departments.map((department) => (
                                                            <option key={department.idDepartment}
                                                                    value={department.idDepartment}>
                                                                {department.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors.idDepartment && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredDepartment}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <i className="fa fa-location-arrow"></i>
                                                    </div>

                                                    <select
                                                        className={`form-control ${errors.idMunicipality ? "is-invalid" : ""}`}
                                                        {...register("idMunicipality", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        disabled={isMunicipalityDisabled}
                                                        // onChange={handleChange}
                                                        // value={selectedValues.idMunicipality}
                                                    >
                                                        <option value="0">Municipio</option>
                                                        {municipalities.map((municipality) => (
                                                            <option key={municipality.idMunicipality}
                                                                    value={municipality.idMunicipality}>
                                                                {municipality.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors.idMunicipality && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredMunicipality}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


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
                                            <p className="m-0 text-secondary text-left" style={{paddingTop: '16px'}}>¿Ya
                                                tienes una
                                                cuenta? <Link to="/login"
                                                              className="link-primary text-decoration-none">Login</Link>
                                            </p>
                                        </div>

                                        <div className="col-12">
                                            <div className="m-account--actions">
                                                <button
                                                    type="submit"
                                                    disabled={!isValid || !isAgreeChecked}
                                                    className="btn btn-block btn-rounded btn-info"
                                                >
                                                    Registrate
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="m-account--footer">
                                                <p>&copy; nexo</p>
                                            </div>
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