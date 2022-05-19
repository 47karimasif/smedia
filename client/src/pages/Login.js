import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../context/auth";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      name
    }
  }
`;

function Login() {
  const { loginfn } = useContext(AuthContext);
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
  });

  const btnStyle = {
    borderRadius: "8px",
    padding: "16px",
    background: "#3846FE",
    color: "#FFF",
    border: "2px solid #F2F5F9",
    fontSize: "20px",
    "&:hover": {
      cursor: "pointer",
    },
    marginTop: "6px",
  };

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: values,
          });
          // localStorage.setItem("token", response.data.login.token);
          loginfn(response.data.login);
          setSubmitting(false);
          history.push("/users");
        }}
      >
        <Form
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <Field
            name="email"
            type="text"
            placeholder="Email"
            style={{
              height: "40px",
              marginBottom: "8px",
              borderRadius: "4px",
              padding: "4px 16px",
            }}
          />
          <ErrorMessage
            name="email"
            component={"div"}
            style={{
              marginBottom: "16px",
              color: "red",
            }}
          />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            style={{
              height: "40px",
              marginBottom: "8px",
              borderRadius: "4px",
              padding: "4px 16px",
            }}
          />
          <ErrorMessage
            name="password"
            component={"div"}
            style={{
              marginBottom: "16px",
              color: "red",
            }}
          />

          <button type="submit" style={btnStyle}>
            Login
          </button>
        </Form>
      </Formik>
      <div className="register">
        <h4 style={{ marginBottom: "8px" }}>Don't have an account?</h4>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
