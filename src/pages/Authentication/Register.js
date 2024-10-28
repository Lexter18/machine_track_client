import React, {useEffect, useState} from "react";
import {
    Row, Col, CardBody, Card, Modal, ModalBody, Button, Container, Input, Label, Form, FormFeedback,
    FormGroup,
    TabContent,
    TabPane,
    Progress,
    NavLink,
    NavItem, UncontrolledAlert,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

// action
import {registerUser, apiError, listCountries, listDepartments, listMunicipality, clearUser} from "../../store/actions";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link, useNavigate} from "react-router-dom";
import classnames from "classnames";

import {createSelector} from 'reselect';

// import images
import logodark from '../../assets/images/logo-dark.png';
import {APP_NAME, IDENTIFICATION_TYPES, OWNER_IDENTIFICATION_TYPES} from "../../constants/constantsUtils";


const Register = props => {
    document.title = "Registro | " + APP_NAME;
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [activeTabwiz, setoggleTabwiz] = useState(1);
    const [passedStepswiz, setpassedStepswiz] = useState([1]);
    const [isTab1Valid, setIsTab1Valid] = useState(false);
    const [isTab2Valid, setIsTab2Valid] = useState(false);
    const [isTab3Valid, setIsTab3Valid] = useState(false);

    function toggleTabwiz(tab) {
        console.log("TAB = ", tab)
        if (activeTabwiz !== tab) {
            var modifiedSteps = [...passedStepswiz, tab];
            if (tab >= 1 && tab <= 3) {
                setoggleTabwiz(tab);
                setpassedStepswiz(modifiedSteps);
            }
        }
    }

    const dispatch = useDispatch();
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            firstSurname: '',
            email: '',
            identification: '',
            identificationType: '0',
            phone: '',
            username: '',
            password: '',
            confirmPassword: '',
            ownerName: '',
            ownerIdentificationType: '0',
            ownerIdentification: '',
            idCountry: '0',
            idDepartment: '0',
            idMunicipality: '0',
            termsAccepted: false
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("Ingresa tu Nombre.")
                .min(3, "Tu nombre debe tener al menos 3 caracteres"),
            firstSurname: Yup.string()
                .required("Ingresa tu apellido.")
                .min(3, "Tu apellido debe tener al menos 3 caracteres"),
            email: Yup.string().required("Ingresa tu Email"),
            identification: Yup.string()
                .required("Ingresa tu Identificacion.")
                .min(4, "Tu identificacion debe tener al menos 4 dígitos.")
                .max(10, "Tu identificacion debe tener 10 dígitos o menos.")
                .matches(/^[0-9]+$/, "Tu identificacion debe ser numérica."),
            identificationType: Yup.string()
                .notOneOf(['0'], 'Selecciona un tipo de identificación válido')
                .required("Selecciona un tipo de identificación"),
            phone: Yup.string()
                .required("Ingresa tu Celular")
                .min(10, "Tu número de celular debe tener 10 dígitos.")
                .max(10, "Tu número de celular debe tener 10 dígitos.")
                .matches(/^[0-9]+$/, "'Tu celular debe ser numérico."),
            username: Yup.string().required("Ingresa tu Usuario")
                .min(4, "Tu usuario debe tener al menos 4 caracteres.")
                .max(20, "Tu usuario debe tener 20 caracteres o menos."),
            password: Yup.string()
                .required("Ingresa tu Password")
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "La contraseña debe incluir mayúsculas, minúsculas y por lo menos un número."),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required("Confirma tu Password")
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "La contraseña debe incluir mayúsculas, minúsculas y por lo menos un número."),
            ownerName: Yup.string()
                .required("Ingresa tu razon social")
                .min(3, "Tu razon social debe tener al menos 3 caracteres."),
            ownerIdentificationType: Yup.string()
                .notOneOf(['0'], 'Selecciona un tipo de identificación válido')
                .required("Selecciona un tipo de identificación"),
            ownerIdentification: Yup.string()
                .required("Ingresa tu # de documento.")
                .min(4, "Tu documento debe tener al menos 4 dígitos.")
                .max(15, "Tu documento debe tener 15 dígitos o menos.")
                .matches(/^[0-9]+$/, "Tu documento debe ser numérico."),
            idCountry: Yup.string()
                .notOneOf(['0'], 'Selecciona un país válido')
                .required("Selecciona un país"),
            idDepartment: Yup.string()
                .notOneOf(['0'], 'Selecciona un departamento válido')
                .required("Selecciona un departamento"),
            idMunicipality: Yup.string()
                .notOneOf(['0'], 'Selecciona un municipio valido válido')
                .required("Selecciona un municipio"),
            termsAccepted: Yup.boolean().oneOf([true], "Debe aceptar los términos y condiciones")
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const countries = useSelector(state => state.locations.countries);
    const globalDepartments = useSelector(state => state.locations.departments);
    const globalMunicipalities = useSelector(state => state.locations.municipalities);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(true);
    const [isMunicipalityDisabled, setIsMunicipalityDisabled] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);

    useEffect(() => {
        dispatch(listCountries());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCountry) {
            dispatch(listDepartments(selectedCountry));
            setIsDepartmentDisabled(false);
        } else {
            setIsDepartmentDisabled(true);
            setDepartments([]);
        }
    }, [selectedCountry, dispatch]);

    useEffect(() => {
        setDepartments(globalDepartments);
    }, [globalDepartments]);

    useEffect(() => {
        //dispatch(listDepartments(1));
        if (selectedDepartment) {
            dispatch(listMunicipality(selectedDepartment));
            setIsMunicipalityDisabled(false);
        } else {
            setIsMunicipalityDisabled(true);
            setMunicipalities([]);
        }
    }, [selectedDepartment, dispatch]);

    useEffect(() => {
        setMunicipalities(globalMunicipalities);
    }, [globalMunicipalities]);

    useEffect(() => {
        if (activeTabwiz === 1) {
            setIsTab1Valid(
                validation.values.firstName !== '' &&
                !validation.errors.firstName &&
                validation.values.firstSurname !== '' &&
                !validation.errors.firstSurname &&
                validation.values.identification !== '' &&
                !validation.errors.identification &&
                validation.values.phone !== '' &&
                !validation.errors.phone &&
                validation.values.identificationType !== '0' &&
                !validation.errors.identificationType
            );
        }

        if (activeTabwiz === 3) {
            setIsTab3Valid(
                validation.values.username !== '' &&
                !validation.errors.username &&
                validation.values.email !== '' &&
                !validation.errors.email &&
                validation.values.password !== '' &&
                !validation.errors.password &&
                validation.values.confirmPassword !== '' &&
                !validation.errors.confirmPassword &&
                validation.values.termsAccepted !== false &&
                !validation.errors.termsAccepted
            );
        }

        if (activeTabwiz === 2) {
            setIsTab2Valid(
                validation.values.ownerName !== '' &&
                !validation.errors.ownerName &&
                validation.values.ownerIdentification !== '' &&
                !validation.errors.ownerIdentification &&
                validation.values.ownerIdentificationType !== '0' &&
                !validation.errors.ownerIdentificationType &&
                validation.values.idCountry !== '0' &&
                !validation.errors.idCountry &&
                validation.values.idDepartment !== '0' &&
                !validation.errors.idDepartment &&
                validation.values.idMunicipality !== '0' &&
                !validation.errors.idMunicipality
            );
        }
    }, [validation.values, validation.errors, activeTabwiz]);

    const registerpage = createSelector(
        (state) => state.account,
        (state) => ({
            user: state.user,
            registrationError: state.registrationError,
        })
    );

    const {user, registrationError} = useSelector(registerpage);
    const handleRegister = () => {
        const registrationData = {
            firstName: validation.values.firstName,
            middleName: validation.values.middleName || "",
            firstSurname: validation.values.firstSurname,
            secondSurname: validation.values.secondSurname || "",
            identification: validation.values.identification,
            identificationType: validation.values.identificationType,
            ownerName: validation.values.ownerName,
            ownerIdentificationType: validation.values.ownerIdentificationType,
            ownerIdentification: validation.values.ownerIdentification,
            username: validation.values.username,
            password: validation.values.password,
            email: validation.values.email,
            phone: validation.values.phone,
            idMunicipality: validation.values.idMunicipality,
            termsAccepted: validation.values.termsAccepted
        };

        dispatch(registerUser(registrationData));
    };

    const handleLoginRedirect = () => {
        dispatch(clearUser());
        setShowSuccessModal(false);
        navigate('/login');
    };

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setShowSuccessModal(true);
        }
    }, [user]);

    return (
        <div className="bg-pattern" style={{height: "120vh"}}>
            <div className="bg-overlay"></div>
            <div className="account-pages">
                <Container>
                    <Row className="justify-content-center">


                        <Col lg="8">
                            <Card className='mt-5'>
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <Link to="/">
                                            <img
                                                src={logodark}
                                                alt=""
                                                height="24"
                                                style={{marginTop: '24px'}}
                                                className="auth-logo logo-dark mx-auto"
                                            />
                                        </Link>
                                    </div>
                                    <h4 className="font-size-18 text-muted mt-2 text-center">
                                        ¡Crea tu cuenta!
                                    </h4>
                                    <p className="mb-5 text-center">
                                        ¿Ya tienes una cuenta?<Link to="/login"
                                                                    className="fw-medium text-primary"> Login </Link>
                                    </p>


                                    <div id="progrss-wizard" className="twitter-bs-wizard">
                                        <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                            <NavItem
                                                className={classnames({
                                                    active: activeTabwiz === 1,
                                                })}
                                            >
                                                <NavLink
                                                    className={
                                                        (classnames({
                                                            active: activeTabwiz === 1,
                                                        }))
                                                    }
                                                    onClick={() => {
                                                        toggleTabwiz(1);
                                                    }}
                                                >
                                                    <span className="step-number">01</span>
                                                    <span className="step-title" style={{paddingLeft: "10px"}}>Datos Personales</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem
                                                className={classnames({
                                                    active: activeTabwiz === 2,
                                                })}
                                            >
                                                <NavLink
                                                    className={
                                                        (classnames({
                                                            active: activeTabwiz === 2,
                                                        }))
                                                    }
                                                    onClick={() => {
                                                        if ((isTab1Valid)) {
                                                            toggleTabwiz(2);
                                                        }
                                                    }}
                                                >
                                                    <span className="step-number">02</span>
                                                    <span className="step-title" style={{paddingLeft: "10px"}}>Datos Empresariales</span>
                                                </NavLink>
                                            </NavItem>

                                            <NavItem
                                                className={classnames({
                                                    active: activeTabwiz === 3,
                                                })}
                                            >
                                                <NavLink
                                                    className={
                                                        (classnames({
                                                            active: activeTabwiz === 3,
                                                        }))
                                                    }
                                                    onClick={() => {
                                                        if ((isTab2Valid)) {
                                                            toggleTabwiz(3);
                                                        }
                                                    }}
                                                >
                                                    <span className="step-number">03</span>
                                                    <span className="step-title" style={{paddingLeft: "10px"}}>Detalle Usuario</span>
                                                </NavLink>
                                            </NavItem>

                                            {/*<NavItem*/}
                                            {/*    className={classnames({*/}
                                            {/*        active: activeTabwiz === 4,*/}
                                            {/*    })}*/}
                                            {/*>*/}
                                            {/*    <NavLink*/}
                                            {/*        className={*/}
                                            {/*            (classnames({*/}
                                            {/*                active: activeTabwiz === 4,*/}
                                            {/*            }))*/}
                                            {/*        }*/}
                                            {/*        onClick={() => {*/}
                                            {/*            if ((isTab3Valid)) {*/}
                                            {/*                toggleTabwiz(4);*/}
                                            {/*            }*/}
                                            {/*        }}*/}
                                            {/*    >*/}
                                            {/*        <span className="step-number">04</span>*/}
                                            {/*        <span className="step-title"*/}
                                            {/*              style={{paddingLeft: "10px"}}>Confirmar</span>*/}
                                            {/*    </NavLink>*/}
                                            {/*</NavItem>*/}
                                        </ul>

                                        <div id="bar" className="mt-4">
                                            <div className="mb-4">
                                                <Progress
                                                    value={25 * activeTabwiz}
                                                    color="success"
                                                    animated
                                                ></Progress>
                                            </div>
                                        </div>

                                        {/* INICIO NOTIFICACIONES */}
                                        {registrationError && (
                                            <UncontrolledAlert color="danger" role="alert">
                                                <strong>Error!</strong>
                                                <div dangerouslySetInnerHTML={{__html: registrationError}}/>
                                            </UncontrolledAlert>
                                        )}

                                        <Modal isOpen={showSuccessModal} role="alert" className="card border p-0 mb-0">
                                            <div className="card-header bg-success-subtle">
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <h5 className="font-size-16 text-success my-1">
                                                            Usuario Creado
                                                        </h5>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                    </div>
                                                </div>
                                            </div>
                                            <ModalBody>
                                                <CardBody className="text-center">
                                                    <i className="mdi mdi-checkbox-marked-circle-outline display-4 text-success"></i>
                                                    <h4 className="alert-heading">Excelente!</h4>
                                                    <p>¡Registro completado con éxito!</p>
                                                    <Button color="primary" onClick={handleLoginRedirect}>
                                                        Ir al Login
                                                    </Button>
                                                </CardBody>
                                            </ModalBody>
                                        </Modal>
                                        {/* FIN NOTIFICACIONES */}

                                        <TabContent activeTab={activeTabwiz} className="twitter-bs-wizard-tab-content">
                                            <TabPane tabId={1}>
                                                <Form>
                                                    <Row>
                                                        <Col lg="6">
                                                            <FormGroup className="mb-3">

                                                                <Label className="form-label">Nombres</Label>
                                                                <Input
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    className="form-control"
                                                                    placeholder="Ingresa tu Nombre"
                                                                    type="text"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.firstName || ""}
                                                                    invalid={
                                                                        !!(validation.touched.firstName && validation.errors.firstName)
                                                                    }
                                                                />
                                                                {validation.touched.firstName && validation.errors.firstName ? (
                                                                    <FormFeedback type="invalid">
                                                                        <div>{validation.errors.firstName}</div>
                                                                    </FormFeedback>
                                                                ) : null}

                                                            </FormGroup>
                                                        </Col>

                                                        <Col lg="6">
                                                            <FormGroup className="mb-3">
                                                                <Label className="form-label">Apellidos</Label>
                                                                <Input
                                                                    id="firstSurname"
                                                                    name="firstSurname"
                                                                    className="form-control"
                                                                    placeholder="Ingresa tu Apellido"
                                                                    type="text"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.firstSurname || ""}
                                                                    invalid={
                                                                        !!(validation.touched.firstSurname && validation.errors.firstSurname)
                                                                    }
                                                                />
                                                                {validation.touched.firstSurname && validation.errors.firstSurname ? (
                                                                    <FormFeedback type="invalid">
                                                                        <div>{validation.errors.firstSurname}</div>
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg="6">
                                                            <FormGroup className="mb-3">
                                                                <div className="mb-4">
                                                                    <label
                                                                        // className="visually-hidden"
                                                                        htmlFor="identificationType"
                                                                    >
                                                                        Tipo Identificacion
                                                                    </label>
                                                                    <select
                                                                        className={`form-select ${validation.touched.identificationType &&
                                                                        validation.errors.identificationType ? "is-invalid" : ""}`}
                                                                        id="identificationType"
                                                                        name="identificationType"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.identificationType}
                                                                    >
                                                                        <option value="0">Seleccione...</option>
                                                                        {IDENTIFICATION_TYPES.map((type) => (
                                                                            <option key={type.value}
                                                                                    value={type.value}>{type.label}</option>
                                                                        ))}
                                                                    </select>
                                                                    {validation.touched.identificationType && validation.errors.identificationType ? (
                                                                        <FormFeedback type="invalid">
                                                                            {validation.errors.identificationType}
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </div>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6">
                                                            <FormGroup className="mb-3">
                                                                <Label className="form-label"># Identificacion</Label>
                                                                <Input
                                                                    id="identification"
                                                                    name="identification"
                                                                    className="form-control"
                                                                    placeholder="Ingresa tu # de identificacion"
                                                                    type="text"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.identification || ""}
                                                                    invalid={
                                                                        !!(validation.touched.identification && validation.errors.identification)
                                                                    }
                                                                />
                                                                {validation.touched.identification && validation.errors.identification ? (
                                                                    <FormFeedback type="invalid">
                                                                        <div>{validation.errors.identification}</div>
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg="6">
                                                            <FormGroup className="mb-3">
                                                                <Label className="form-label"># Celular</Label>
                                                                <Input
                                                                    id="phone"
                                                                    name="phone"
                                                                    className="form-control"
                                                                    placeholder="Ingresa tu # de Celular"
                                                                    type="text"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.phone || ""}
                                                                    invalid={
                                                                        !!(validation.touched.phone && validation.errors.phone)
                                                                    }
                                                                />
                                                                {validation.touched.phone && validation.errors.phone ? (
                                                                    <FormFeedback type="invalid">
                                                                        <div>{validation.errors.phone}</div>
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </TabPane>
                                            <TabPane tabId={2}>
                                                <div>
                                                    <Form>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <Label className="form-label">Nombre / Razon
                                                                        Social</Label>
                                                                    <Input
                                                                        id="ownerName"
                                                                        name="ownerName"
                                                                        type="text"
                                                                        placeholder="Ingresa tu Razon Social"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.ownerName || ""}
                                                                        invalid={
                                                                            !!(validation.touched.ownerName && validation.errors.ownerName)
                                                                        }
                                                                    />
                                                                    {validation.touched.ownerName && validation.errors.ownerName ? (
                                                                        <FormFeedback type="invalid">
                                                                            <div>{validation.errors.ownerName}</div>
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>

                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        // className="visually-hidden"
                                                                        htmlFor="inlineFormSelectPref"
                                                                    >
                                                                        Tipo Documento
                                                                    </label>
                                                                    <select
                                                                        className={`form-select ${validation.touched.ownerIdentificationType &&
                                                                        validation.errors.ownerIdentificationType ? "is-invalid" : ""}`}
                                                                        id="ownerIdentificationType"
                                                                        name="ownerIdentificationType"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.ownerIdentificationType}
                                                                    >
                                                                        <option value="0">Seleccione...</option>
                                                                        {OWNER_IDENTIFICATION_TYPES.map((type) => (
                                                                            <option key={type.value}
                                                                                    value={type.value}>{type.label}</option>
                                                                        ))}
                                                                    </select>
                                                                    {validation.touched.ownerIdentificationType && validation.errors.ownerIdentificationType ? (
                                                                        <FormFeedback type="invalid">
                                                                            {validation.errors.ownerIdentificationType}
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <Label className="form-label"># Documento</Label>
                                                                    <Input
                                                                        id="ownerIdentification"
                                                                        name="ownerIdentification"
                                                                        type="text"
                                                                        placeholder="Ingresa tu numero de documento"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.ownerIdentification || ""}
                                                                        invalid={
                                                                            !!(validation.touched.ownerIdentification && validation.errors.ownerIdentification)
                                                                        }
                                                                    />
                                                                    {validation.touched.ownerIdentification && validation.errors.ownerIdentification ? (
                                                                        <FormFeedback type="invalid">
                                                                            <div>{validation.errors.ownerIdentification}</div>
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>

                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        // className="visually-hidden"
                                                                        htmlFor="idCountry"
                                                                    >
                                                                        Pais
                                                                    </label>
                                                                    <select
                                                                        //className="form-select"
                                                                        id="idCountry"
                                                                        value={validation.values.idCountry}
                                                                        onChange={(e) => {
                                                                            validation.handleChange(e);
                                                                            setSelectedCountry(e.target.value);
                                                                        }}
                                                                        onBlur={validation.handleBlur}
                                                                        className={`form-select ${validation.touched.idCountry &&
                                                                        validation.errors.idCountry ? "is-invalid" : ""}`}
                                                                    >
                                                                        <option value="0">Seleccione...</option>
                                                                        {countries && countries.length > 0 ? (
                                                                            countries.map((country) => (
                                                                                <option key={country.idCountry}
                                                                                        value={country.idCountry}>
                                                                                    {country.name}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option value="">Cargando países...</option>
                                                                        )}
                                                                    </select>
                                                                    {validation.touched.idCountry && validation.errors.idCountry ? (
                                                                        <FormFeedback type="invalid">
                                                                            {validation.errors.idCountry}
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        htmlFor="idDepartment"
                                                                    >
                                                                        Departamento
                                                                    </label>
                                                                    <select
                                                                        id="idDepartment"
                                                                        disabled={isDepartmentDisabled}
                                                                        value={validation.values.idDepartment}
                                                                        onChange={(e) => {
                                                                            validation.handleChange(e);
                                                                            setSelectedDepartment(e.target.value);
                                                                        }}
                                                                        onBlur={validation.handleBlur}
                                                                        className={`form-select ${validation.touched.idDepartment &&
                                                                        validation.errors.idDepartment ? "is-invalid" : ""}`}
                                                                    >
                                                                        <option value="0">Seleccione...</option>
                                                                        {departments && departments.length > 0 ? (
                                                                            departments.map((department) => (
                                                                                <option key={department.idDepartment}
                                                                                        value={department.idDepartment}>
                                                                                    {department.name}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option value="">Cargando
                                                                                departementos...</option>
                                                                        )}
                                                                    </select>
                                                                    {validation.touched.idDepartment && validation.errors.idDepartment ? (
                                                                        <FormFeedback type="invalid">
                                                                            {validation.errors.idDepartment}
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        htmlFor="idMunicipality"
                                                                    >
                                                                        Ciudad
                                                                    </label>
                                                                    <select
                                                                        id="idMunicipality"
                                                                        disabled={isMunicipalityDisabled}
                                                                        value={validation.values.idMunicipality}
                                                                        onChange={(e) => {
                                                                            validation.handleChange(e);
                                                                        }}
                                                                        onBlur={validation.handleBlur}
                                                                        className={`form-select ${validation.touched.idMunicipality &&
                                                                        validation.errors.idMunicipality ? "is-invalid" : ""}`}
                                                                    >
                                                                        <option value="0">Seleccione...</option>
                                                                        {municipalities && municipalities.length > 0 ? (
                                                                            municipalities.map((municipality) => (
                                                                                <option
                                                                                    key={municipality.idMunicipality}
                                                                                    value={municipality.idMunicipality}>
                                                                                    {municipality.name}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option value="">Cargando
                                                                                departementos...</option>
                                                                        )}
                                                                    </select>
                                                                    {validation.touched.idMunicipality && validation.errors.idMunicipality ? (
                                                                        <FormFeedback type="invalid">
                                                                            {validation.errors.idMunicipality}
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId={3}>
                                                <div>
                                                    <Form>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <Label className="form-label">Usuario</Label>
                                                                    <Input
                                                                        id="username"
                                                                        name="username"
                                                                        type="text"
                                                                        placeholder="Ingrese su usuario"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.username || ""}
                                                                        invalid={
                                                                            !!(validation.touched.username && validation.errors.username)
                                                                        }
                                                                    />
                                                                    {validation.touched.username && validation.errors.username ? (
                                                                        <FormFeedback type="invalid">
                                                                            <div>{validation.errors.username}</div>
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>

                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <Label className="form-label">Email</Label>
                                                                    <Input
                                                                        id="email"
                                                                        name="email"
                                                                        className="form-control"
                                                                        placeholder="Ingresa tu Email"
                                                                        type="email"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.email || ""}
                                                                        invalid={
                                                                            !!(validation.touched.email && validation.errors.email)
                                                                        }
                                                                    />
                                                                    {validation.touched.email && validation.errors.email ? (
                                                                        <FormFeedback type="invalid">
                                                                            <div>{validation.errors.email}</div>
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <Label className="form-label">Password</Label>
                                                                    <Input
                                                                        id="password"
                                                                        name="password"
                                                                        type="password"
                                                                        placeholder="Enter Password"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.password || ""}
                                                                        invalid={
                                                                            !!(validation.touched.password && validation.errors.password)
                                                                        }
                                                                    />
                                                                    {validation.touched.password && validation.errors.password ? (
                                                                        <FormFeedback type="invalid">
                                                                            <div>{validation.errors.password}</div>
                                                                        </FormFeedback>
                                                                    ) : null}
                                                                </FormGroup>
                                                            </Col>

                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <div className="mb-4">
                                                                        <Label className="form-label">Confirmar
                                                                            Password</Label>
                                                                        <Input
                                                                            id="confirmPassword"
                                                                            name="confirmPassword"
                                                                            type="password"
                                                                            placeholder="Confirmar Password"
                                                                            onChange={validation.handleChange}
                                                                            onBlur={validation.handleBlur}
                                                                            value={validation.values.confirmPassword || ""}
                                                                            invalid={
                                                                                !!(validation.touched.confirmPassword && validation.errors.confirmPassword)
                                                                            }
                                                                        />
                                                                        {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{validation.errors.confirmPassword}</div>
                                                                            </FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="9">
                                                                <div className="form-check">
                                                                    <input type="checkbox"
                                                                           className="form-check-input"
                                                                           id="termsAccepted"
                                                                           name="termsAccepted"
                                                                           onChange={validation.handleChange}
                                                                           checked={validation.values.termsAccepted}/>
                                                                    <label className="form-check-label fw-normal"
                                                                           htmlFor="term-conditionCheck">Estoy de
                                                                        acuerdo con <Link
                                                                            to="#"
                                                                            className="text-primary">los
                                                                            términos y condiciones</Link></label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            </TabPane>
                                        </TabContent>

                                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                                            <li
                                                className={
                                                    activeTabwiz === 1
                                                        ? "previous disabled me-2"
                                                        : "previous me-2"
                                                }
                                            >
                                                <Link
                                                    to="#"
                                                    onClick={() => {
                                                        toggleTabwiz(activeTabwiz - 1);
                                                    }}
                                                >
                                                    Volver
                                                </Link>
                                            </li>
                                            <li
                                                className={
                                                    (activeTabwiz === 1 && !isTab1Valid) ||
                                                    (activeTabwiz === 2 && !isTab2Valid) ||
                                                    (activeTabwiz === 3 && !isTab3Valid)
                                                        ? "next disabled"
                                                        : "next"
                                                }
                                            >
                                                <Link
                                                    to="#"
                                                    disabled={(activeTabwiz === 1 && !isTab1Valid)}
                                                    onClick={() => {
                                                        if ((activeTabwiz === 1 && isTab1Valid) ||
                                                            (activeTabwiz === 2 && isTab2Valid) ||
                                                            (activeTabwiz === 3 && isTab3Valid)) {

                                                            if (activeTabwiz === 3) {
                                                                handleRegister();
                                                            } else {
                                                                toggleTabwiz(activeTabwiz + 1);
                                                            }

                                                        }
                                                    }}
                                                >
                                                    {activeTabwiz === 3 ? "Registrar" : "Continuar"}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Register;
