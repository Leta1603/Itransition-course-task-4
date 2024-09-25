import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FormContainer from "../../components/FormContainer";
import { RoutesList } from "../Router.tsx";
import styles from "./SignIn.module.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState({
    email: "",
    passwordField: "",
  });

  const [isTouched, setTouched] = useState({
    email: false,
    passwordField: false,
  });

  const navigate = useNavigate();
  const onSubmitClick = () => {};

  const onSignUpClick = () => {
    navigate(RoutesList.SignUp);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setTouched((prevState) => ({ ...prevState, email: true }));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  useEffect(() => {
    if (isTouched.email) {
      const regex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (!regex.test(email)) {
        setError((prevState) => ({
          ...prevState,
          email: "Invalid email format",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }

    if (isTouched.passwordField) {
      if (password.length < 1) {
        setError((prevState) => ({
          ...prevState,
          passwordField: "Password length should be more than 1 characters",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          passwordField: "",
        }));
      }
    }
  }, [email, password, isTouched.email, isTouched.passwordField]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.email &&
      password.length &&
      email.length &&
      !isError.passwordField.length &&
      !isError.email.length,
    [
      password,
      email,
      isTouched.passwordField,
      isTouched.email,
      isError.email,
      isError.passwordField,
    ],
  );

  return (
    <FormContainer
      title={"Sign in"}
      btnTitle={"Sign In"}
      onSubmit={onSubmitClick}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Don’t have an account?"}
          <span onClick={onSignUpClick} className={styles.signUp}>
            Sign Up
          </span>
        </div>
      }
      isSubmitDisabled={!isSubmitValid}
    >
      <TextField
        error={!!isError.email}
        id="email"
        label="Email"
        value={email}
        onChange={onChangeEmail}
        fullWidth
        helperText={isError.email}
      />
      <TextField
        error={!!isError.passwordField}
        id="password"
        label="Password"
        value={password}
        onChange={onChangePassword}
        fullWidth
        helperText={isError.passwordField}
        type="password"
      />
    </FormContainer>
  );
};

export default SignIn;
