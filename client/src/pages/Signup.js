import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../context/auth";

const SIGNUP_MUTATION = gql`
  mutation Signup_User($name: String!, $email: String!, $password: String!) {
    signup(input: { name: $name, email: $email, password: $password }) {
      token
      name
    }
  }
`;

function Signup() {
  const { loginfn } = useContext(AuthContext);
  const history = useHistory();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  const fieldStyle = {
    height: "40px",
    marginBottom: "8px",
    borderRadius: "4px",
    padding: "4px 16px",
  };

  const errorStyle = {
    marginBottom: "16px",
    color: "red",
  };
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
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          // localStorage.setItem("token", response.data.signup.token);
          loginfn(response.data.signup);
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
            style={fieldStyle}
          />
          <ErrorMessage name="email" component={"div"} style={errorStyle} />
          <Field
            name="name"
            type="text"
            placeholder="Name"
            style={fieldStyle}
          />
          <ErrorMessage name="name" component={"div"} style={errorStyle} />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            style={fieldStyle}
          />
          <ErrorMessage name="password" component={"div"} style={errorStyle} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            style={fieldStyle}
          />
          <ErrorMessage
            name="confirmPassword"
            component={"div"}
            style={errorStyle}
          />
          <button type="submit" style={btnStyle}>
            Signup
          </button>
        </Form>
      </Formik>
      <div className="register">
        <h4 style={{ marginBottom: "8px" }}>Already have an account?</h4>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;
