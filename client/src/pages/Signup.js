import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
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

  return (
    <div>
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
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
