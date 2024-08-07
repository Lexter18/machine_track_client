import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../auth/context/AuthContext";
import {IDENTIFICATION_TYPES, OWNER_IDENTIFICATION_TYPES} from "../../utils/constants";
import {useForm} from "react-hook-form";
import {validationMessages} from "../../utils/validationMessages.js";
import {useUsers} from "../../hooks/useUsers.js";
import {MachinTrackContext} from "../../context/MachinTrackContext.jsx";
import {LocationsContext} from "../../context/LocationsContext.jsx";
import {InputField} from "../common/InputField.jsx";
import {OwnerSearchModal} from "./OwnerSearchModal.jsx";

export const UserForm = ({user}) => {

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

    const {
        roles,
        states,
        positions
    } = useContext(MachinTrackContext);


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

    // const {createUser} = useUsers();

    const [selectedValues, setSelectedValues] = useState({
        idMunicipality: user ?
            user.employee.municipality.idMunicipality : '',
        positions: user ?
            user.employee.position.idPosition : '',
        role: user ? user.role.idRole : '',
        userStates: user ?
            user.state.idState : '',
        ownerIdentificationType: user.owner.identificationType || '0'
    });

    const [selectedCountry, setSelectedCountry] = useState(user ?
        user.employee.municipality.department.country.idLocation : '');
    const [selectedDepartment, setSelectedDepartment] = useState(user ?
        user.employee.municipality.department.idDepartment : '');

    // const [selectedRole, setSelectedRole] = useState(user ? user.role.idRole : '');
    // const [selectedPosition, setSelectedPosition] = useState(user ?
    //     user.employee.position.idPosition : '');

    // const [selectedUserStates, setSelectedUserStates] = useState(user ?
    //     user.state.idState : '');
    const [isFormInitialized, setIsFormInitialized] = useState(false);

    const password = watch('password');
    const isEditing = !!user;

    // MODAL DEL OWNERS
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState({
        name: user ? user.owner.owner : '',
        identificationType: user ? user.owner.identificationType : '',
        identification: user ? user.owner.identification : ''
    });
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSelectOwner = (owner) => {
        setSelectedOwner(owner);
        setValue('ownerName', owner.name);
        setValue('ownerIdentificationType', owner.identificationType);
        setValue('ownerIdentification', owner.identification);
    };


    // console.log("USER = ", JSON.stringify(user, null, 2))
    // console.log("ROLES = ", JSON.stringify(roles, null, 2))
    // console.log("CONUNTRY = ", JSON.stringify(countries, null, 2))

    useEffect(() => {
        if (user) {
            setSelectedOwner({
                name: user.owner.owner,
                identificationType: user.owner.identificationType,
                identification: user.owner.identification
            });
        }
    }, [user]);


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

    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setSelectedMunicipality(value);
    //     setValue("idMunicipality", value); // Set the value in the form
    //     if (value === "0") {
    //         trigger("idMunicipality"); // Trigger validation only for the role field
    //     } else {
    //         clearErrors("idMunicipality"); // Clear errors for the role field if a valid option is selected
    //         trigger("idMunicipality");
    //     }
    // };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setSelectedValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // setSelectedMunicipality(value);
        setValue(name, value);
        if (value === "0") {
            trigger(name); // Trigger validation only for the field
        } else {
            clearErrors(name); // Clear errors for the field if a valid option is selected
            trigger(name);
        }
    };


    useEffect(() => {
        if (isEditing && !isFormInitialized) {
            setValue('firstName', user.employee.firstName);
            setValue('middleName', user.employee.middleName);
            setValue('firstSurname', user.employee.firstSurname);
            setValue('secondSurname', user.employee.secondSurname);
            setValue('email', user.employee.email);
            setValue('phone', user.employee.phone);
            setValue('identificationType', user.employee.identificationType);
            setValue('identification', user.employee.identification);
            setValue('idLocation', selectedCountry);
            setValue('idDepartment', selectedDepartment);
            setValue('idMunicipality', selectedValues.idMunicipality);
            setValue('positions', selectedValues.positions);
            setValue('username', user.userName);
            setValue('role', selectedValues.role);
            setValue('userStates', selectedValues.userStates);
            setValue('ownerName', user.owner.owner || '');
            setValue('ownerIdentificationType', selectedValues.ownerIdentificationType);
            setValue('ownerIdentification', user.owner.identification || '');
            setIsFormInitialized(true);
            trigger();
        }

        if (selectedCountry) {
            fetchDepartments(selectedCountry);
        }

        if (selectedDepartment) {
            fetchMunicipalities(selectedDepartment);
        }

        if (isFormInitialized) {
            trigger(); // Forzar la validación cada vez que se recarga la página
        }

    }, [user, setValue, selectedCountry, selectedDepartment, selectedValues.role, selectedValues.idMunicipality,
        selectedValues.positions, selectedValues.userStates, selectedValues.ownerIdentificationType,
        isFormInitialized, trigger]);

    const onSubmit = async (data) => {
        if (isEditing && user) {
            data.idUser = user.idUser;
            data.idEmployee = user.employee.idEmployee;
            // data.idOwner = user.owner.idOwner;
        }
        console.log("USER = ", JSON.stringify(data, null, 2))
        //await createUser(data);
    }

    return (

        <section className="bg-light pb-3 pb-md-4 pb-xl-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="row gy-3 gy-md-4">
                        <div className="col-12">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">

                                    <div className="card-header bg-transparent p-4 border-light-subtle">
                                        <h5 className="card-title widget-card-title m-0 fs-1">Perfil</h5>
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb m-0 fs-7">
                                                <li className="breadcrumb-item">
                                                    <Link className="link-primary text-decoration-none"
                                                          to="/home">Home</Link>
                                                </li>
                                                <li className="breadcrumb-item">Gestionar</li>
                                                <li className="breadcrumb-item" aria-current="page">
                                                    <Link className="link-primary text-decoration-none"
                                                          to="/users/owners">Listado De Owners</Link>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">Detalle De
                                                    Usuarios
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>

                                    <div className="card-body p-4 mt-4 ">
                                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                                            <h5 className="card-title widget-card-title m-0 fs-4">Empleado</h5>
                                            <div className="col-md-6">
                                                <InputField
                                                    type="text"
                                                    label="Primer Nombre"
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
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <InputField
                                                    type="text"
                                                    label="Segundo Nombre"
                                                    name="middleName"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{}}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <InputField
                                                    type="text"
                                                    label="Primer Apellido"
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
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <InputField
                                                    type="text"
                                                    label="Segundo Apellido"
                                                    name="secondSurname"
                                                    register={register}
                                                    errors={errors}
                                                    trigger={trigger}
                                                    validationRules={{}}
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <InputField
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
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <InputField
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
                                                />
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
                                                <InputField
                                                    type="text"
                                                    label="Numero Identificacion"
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
                                                />

                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${errors.idLocation ? "is-invalid" : ""}`}
                                                        {...register("idLocation", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        onChange={handleCountryChange}
                                                        value={selectedCountry}>
                                                        <option value="0">Seleccione</option>
                                                        {countries.map((country) => (
                                                            <option key={country.idCountry}
                                                                    value={country.idCountry}>{country.name}</option>
                                                        ))}
                                                    </select>

                                                    <label className="form-label">Pais</label>
                                                    {errors.idLocation && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredCountry}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${errors.idDepartment ? "is-invalid" : ""}`}
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
                                                        <option value="0">Seleccione</option>
                                                        {departments.map((department) => (
                                                            <option key={department.idDepartment}
                                                                    value={department.idDepartment}>
                                                                {department.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Departamento</label>
                                                    {errors.idDepartment && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredDepartment}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${errors.idMunicipality ? "is-invalid" : ""}`}
                                                        {...register("idMunicipality",
                                                            {
                                                                required: true, validate: {
                                                                    notZero: (value) => value !== "0",
                                                                },
                                                            })}
                                                        disabled={isMunicipalityDisabled}
                                                        onChange={handleChange}
                                                        value={selectedValues.idMunicipality}
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
                                                    {errors.idMunicipality && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.location.requiredMunicipality}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${selectedValues.positions === "0" ? "is-invalid" : ""
                                                        }`}
                                                        {...register("positions", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        onChange={handleChange}
                                                        value={selectedValues.positions}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {positions.map((position) => (
                                                            <option key={position.idPosition}
                                                                    value={position.idPosition}>{position.position}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Cargo</label>
                                                    {errors.positions && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.position.required}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            <h5 className="card-title widget-card-title m-0 fs-4 mt-4">Usuario</h5>

                                            <div className="col-md-4">
                                                <InputField
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
                                                />
                                            </div>


                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${selectedValues.role === "0" ? "is-invalid" : ""
                                                        }`}
                                                        {...register("role", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        onChange={handleChange}
                                                        value={selectedValues.role}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {roles.map((role) => (
                                                            <option key={role.idRole}
                                                                    value={role.idRole}>{role.roleDescription}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Rol</label>
                                                    {errors.role && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.role.required}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select mb-3 ${
                                                            selectedValues.userStates === "0" ? "is-invalid" : ""
                                                        }`}
                                                        {...register("userStates", {
                                                            required: true,
                                                            validate: {
                                                                notZero: (value) => value !== "0",
                                                            },
                                                        })}
                                                        onChange={handleChange}
                                                        value={selectedValues.userStates}
                                                    >
                                                        <option value="0">Seleccione</option>
                                                        {states.map((state) => (
                                                            <option key={state.idState}
                                                                    value={state.idState}>{state.state}</option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label">Estado</label>
                                                    {errors.userStates && (
                                                        <div className="invalid-feedback">
                                                            {validationMessages.userState.required}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {!isEditing && (
                                                <>
                                                    <div className="col-md-6">
                                                        <InputField
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
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <InputField
                                                            type="password"
                                                            label="Confirmar Password"
                                                            name="confirmPassword"
                                                            register={register}
                                                            errors={errors}
                                                            trigger={trigger}
                                                            validationRules={{
                                                                required: validationMessages.password.required,
                                                                validate: value => value === password || validationMessages.confirmPassword.match
                                                            }}
                                                        />
                                                    </div>

                                                </>

                                            )}


                                            <h5 className="card-title widget-card-title m-0 fs-4 mt-4">Propietario</h5>

                                            <div className="col-md-6">
                                                {/*<InputField*/}
                                                {/*    type="text"*/}
                                                {/*    label="Nombre / Razon Social"*/}
                                                {/*    name="ownerName"*/}
                                                {/*    register={register}*/}
                                                {/*    errors={errors}*/}
                                                {/*    trigger={trigger}*/}
                                                {/*    validationRules={{*/}
                                                {/*        required: validationMessages.ownerName.required,*/}
                                                {/*        minLength: {*/}
                                                {/*            value: 3,*/}
                                                {/*            message: validationMessages.ownerName.minLength*/}
                                                {/*        }*/}
                                                {/*    }}*/}
                                                {/*/>*/}

                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           className={`form-control form-control-sm ${errors.ownerName ? 'is-invalid' : ''}`}
                                                           name="ownerName"
                                                           id="ownerName"
                                                           placeholder="Nombre / Razon Social"
                                                           value={selectedOwner.name}
                                                           readOnly
                                                           onClick={handleOpenModal}
                                                           {...register('ownerName', {
                                                               required: validationMessages.ownerName.required,
                                                               minLength: {
                                                                   value: 3,
                                                                   message: validationMessages.ownerName.minLength
                                                               }
                                                           })}
                                                           onBlur={() => trigger('ownerName')}
                                                    />

                                                    <label htmlFor="ownerName" className="form-label">Nombre / Razon
                                                        Social </label>
                                                    {errors.ownerName && <div className="invalid-feedback">
                                                        {errors.ownerName.message}
                                                    </div>}

                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <InputField
                                                        type="text"
                                                        label="Tipo Identificacion"
                                                        name="ownerIdentificationType"
                                                        register={register}
                                                        errors={errors}
                                                        trigger={trigger}
                                                        validationRules={{
                                                            required: validationMessages.ownerIdentificationType.required
                                                        }}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-floating mb-3">
                                                    <InputField
                                                        type="text"
                                                        label="Numero Identificacion"
                                                        name="ownerIdentification"
                                                        register={register}
                                                        errors={errors}
                                                        trigger={trigger}
                                                        validationRules={{
                                                            required: validationMessages.ownerIdentification.required,
                                                        }}
                                                        readOnly={true}
                                                    />


                                                </div>


                                            </div>

                                            <OwnerSearchModal
                                                isOpen={isModalOpen}
                                                onClose={handleCloseModal}
                                                onSelectOwner={handleSelectOwner}
                                            />

                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="submit"
                                                        disabled={!isValid}
                                                    >
                                                        Guardar
                                                    </button>
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
        </section>

    )
        ;
}