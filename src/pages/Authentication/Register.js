import React, {useEffect, useState} from "react";
import {
    Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback,
    FormGroup,
    TabContent,
    TabPane,
    Progress,
    NavLink,
    NavItem,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

// action
import {registerUser, apiError} from "../../store/actions";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";
import classnames from "classnames";

import {createSelector} from 'reselect';

// import images
import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';
import {IDENTIFICATION_TYPES, OWNER_IDENTIFICATION_TYPES} from "../../constants/constantsUtils";


const Register = props => {
    document.title = "Register | Upzet - React Admin & Dashboard Template";

    const [activeTabwiz, setoggleTabwiz] = useState(1);
    const [passedStepswiz, setpassedStepswiz] = useState([1]);
    const [isTab1Valid, setIsTab1Valid] = useState(false);
    const [isTab2Valid, setIsTab2Valid] = useState(false);
    const [isTab3Valid, setIsTab3Valid] = useState(false);

    function toggleTabwiz(tab) {
        if (activeTabwiz !== tab) {
            var modifiedSteps = [...passedStepswiz, tab];
            if (tab >= 1 && tab <= 4) {
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
                .matches(/^[0-9]+$/, "Tu documento debe ser numérica."),
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

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
                validation.values.identificationType !== '' &&
                !validation.errors.identificationType
            );
        }

        if (activeTabwiz === 2) {
            setIsTab2Valid(
                validation.values.username !== '' &&
                !validation.errors.username &&
                validation.values.email !== '' &&
                !validation.errors.email &&
                validation.values.password !== '' &&
                !validation.errors.password &&
                validation.values.confirmPassword !== '' &&
                !validation.errors.confirmPassword
            );
        }

        if (activeTabwiz === 3) {
            setIsTab3Valid(
                validation.values.ownerName !== '' &&
                !validation.errors.ownerName &&
                validation.values.ownerIdentification !== '' &&
                !validation.errors.ownerIdentification &&
                validation.values.ownerIdentificationType !== '0' &&
                !validation.errors.ownerIdentificationType
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
// Inside your component
    const {user, registrationError} = useSelector(registerpage);

    // handleValidSubmit
    // const handleValidSubmit = values => {
    //   dispatch(registerUser(values));
    // };

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

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
                                                className="auth-logo logo-dark mx-auto"
                                            />
                                            <img
                                                src={logolight}
                                                alt=""
                                                height="24"
                                                className="auth-logo logo-light mx-auto"
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
                                                    <span className="step-title" style={{paddingLeft: "10px"}}>Detalle Usuario</span>
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
                                                    <span className="step-title" style={{paddingLeft: "10px"}}>Datos Empresariales</span>
                                                </NavLink>
                                            </NavItem>

                                            <NavItem
                                                className={classnames({
                                                    active: activeTabwiz === 4,
                                                })}
                                            >
                                                <NavLink
                                                    className={
                                                        (classnames({
                                                            active: activeTabwiz === 4,
                                                        }))
                                                    }
                                                    onClick={() => {
                                                        toggleTabwiz(4);
                                                    }}
                                                >
                                                    <span className="step-number">04</span>
                                                    <span className="step-title"
                                                          style={{paddingLeft: "10px"}}>Confirmar</span>
                                                </NavLink>
                                            </NavItem>
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
                                                                        htmlFor="inlineFormSelectPref"
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
                                                                        placeholder="Ingresa tu Razon Social"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.ownerIdentification || ""}
                                                                        invalid={
                                                                            !!(validation.touched.ownerIdentification && validation.errors.ownerIdentification)
                                                                        }
                                                                    />
                                                                    {validation.touched.ownerName && validation.errors.ownerIdentification ? (
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
                                                                        htmlFor="inlineFormSelectPref"
                                                                    >
                                                                        Pais
                                                                    </label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="inlineFormSelectPref"
                                                                    >
                                                                        <option defaultValue>Seleccione...</option>
                                                                        <option defaultValue="1">One</option>
                                                                        <option defaultValue="2">Two</option>
                                                                        <option defaultValue="3">Three</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        // className="visually-hidden"
                                                                        htmlFor="inlineFormSelectPref"
                                                                    >
                                                                        Departamento
                                                                    </label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="inlineFormSelectPref"
                                                                    >
                                                                        <option defaultValue>Seleccione...</option>
                                                                        <option defaultValue="1">One</option>
                                                                        <option defaultValue="2">Two</option>
                                                                        <option defaultValue="3">Three</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="6">
                                                                <FormGroup className="mb-3">
                                                                    <label
                                                                        // className="visually-hidden"
                                                                        htmlFor="inlineFormSelectPref"
                                                                    >
                                                                        Ciudad
                                                                    </label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="inlineFormSelectPref"
                                                                    >
                                                                        <option defaultValue>Seleccione...</option>
                                                                        <option defaultValue="1">One</option>
                                                                        <option defaultValue="2">Two</option>
                                                                        <option defaultValue="3">Three</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId={4}>
                                                <div className="row justify-content-center">
                                                    <Col lg="12">
                                                        <div className="text-center">
                                                            <div className="mb-4">
                                                                <i className="mdi mdi-check-circle-outline text-success display-4"/>
                                                            </div>
                                                            <div>
                                                                <h5>Confirm Detail</h5>
                                                                <p className="text-muted">
                                                                    If several languages coalesce, the grammar
                                                                    of the resulting
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Col>
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
                                                    Previous
                                                </Link>
                                            </li>
                                            <li
                                                className={
                                                    (activeTabwiz === 4) ||
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
                                                            toggleTabwiz(activeTabwiz + 1);
                                                        }
                                                    }}
                                                >
                                                    Next
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
