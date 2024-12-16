import PropTypes from "prop-types";
import React, {useEffect} from "react";
import logodark from "../../assets/images/logo-dark.png";

import {Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label} from "reactstrap";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import {useFormik} from "formik";

// actions
import {loginUser} from "../../store/actions";

import {createSelector} from 'reselect';
import {APP_NAME} from "../../constants/constantsUtils";

const Login = props => {
    document.title = "Login | " + APP_NAME;

    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: "lmontes" || '',
            password: "admin" || '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Por favor ingrese su Usuario"),
            password: Yup.string().required("Por favor ingrese su Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });

    const loginpage = createSelector(
        (state) => state.login,
        (state) => ({
            error: state.error,
        })
    );
// Inside your component
    const {error} = useSelector(loginpage);

    useEffect(() => {
        document.body.className = "bg-pattern";
        // remove classname when component will unmount
        return function cleanup() {
            document.body.className = "";
        };
    });

    return (
        <React.Fragment>

            <div className="bg-overlay"></div>
            <div className="account-pages my-5 pt-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} md={8} xl={4}>
                            <Card>
                                <CardBody className="p-4">
                                    <div>
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
                                            ¡Bienvenido de nuevo!
                                        </h4>
                                        <p className="mb-5 text-center">
                                            Inicie sesión para continuar en Nexo
                                        </p>
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            {error ? <Alert color="danger">
                                                <div>{error}</div>
                                            </Alert> : null}
                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-4">
                                                        <Label className="form-label">Usuario</Label>
                                                        <Input
                                                            name="username"
                                                            className="form-control"
                                                            placeholder="Ingrese su usuario"
                                                            type="text"
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
                                                    </div>
                                                    <div className="mb-4">
                                                        <Label className="form-label">Password</Label>
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type="password"
                                                            placeholder="Ingrese Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                !!(validation.touched.password && validation.errors.password)
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">
                                                                <div> {validation.errors.password} </div>
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                    <Row>
                                                        <Col>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customControlInline"
                                                                />
                                                                <label
                                                                    className="form-label form-check-label"
                                                                    htmlFor="customControlInline"
                                                                >
                                                                    Remember me
                                                                </label>
                                                            </div>
                                                        </Col>
                                                        <Col className="col-7">
                                                            <div className="text-md-end mt-3 mt-md-0">
                                                                <Link
                                                                    to="/auth-recoverpw"
                                                                    className="text-muted"
                                                                >
                                                                    <i className="mdi mdi-lock"></i> ¿ Olvidaste tu
                                                                    Password ?
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="d-grid mt-4">
                                                        <button
                                                            className="btn btn-primary waves-effect waves-light"
                                                            type="submit"
                                                        >
                                                            Log In
                                                        </button>
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                    </div>

                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p className="text-white-50">
                                    ¿No tienes una cuenta?{" "}
                                    <Link to="/register" className="fw-medium text-primary">
                                        {" "}
                                        Register{" "}
                                    </Link>{" "}
                                </p>
                                <p className="text-white-50">
                                    © {new Date().getFullYear()} Creado con {" "}
                                    <i className="mdi mdi-heart text-danger"></i> by Nexo
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
};
