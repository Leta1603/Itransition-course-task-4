import { ChangeEvent, useEffect, useMemo, useState } from "react";
import moment from "moment";
import CryptoJS from "crypto-js";
import FormContainer from "../../components/FormContainer";
import { TextField } from "@mui/material";

import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [lastLoginTime, setLastLoginTime] = useState("");
  // const [registrationTime, setRegistrationTime] = useState("");
  // const [status, setStatus] = useState("");

  const [isError, setError] = useState({
    fullName: "",
    email: "",
    passwordField: "",
    confirm: "",
  });

  const [isTouched, setTouched] = useState({
    fullName: false,
    email: false,
    passwordField: false,
    confirm: false,
  });

  const dispatch = useDispatch();

  function calculateHMAC(key: any, password: any) {
    CryptoJS.HmacSHA256(password, key).toString(CryptoJS.enc.Hex);
  }
  function generateKey() {
    const array = new Uint8Array(32); // 32 байта = 256 бит
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }

  const onChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    setTouched((prevState) => ({ ...prevState, fullName: true }));
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setTouched((prevState) => ({ ...prevState, email: true }));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  const onChangePasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  useEffect(() => {
    if (isTouched.fullName) {
      if (fullName.length < 1) {
        setError((prevState) => ({
          ...prevState,
          fullName: "Full name length should be more than 1 characters",
          // fullName: "Username already exists",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          fullName: "",
        }));
      }
    }

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

      if (isTouched.confirm) {
        if (confirmPassword.length < 1) {
          setError((prevState) => ({
            ...prevState,
            confirm: "Confirm password length should be more than 1 characters",
          }));
        } else if (password !== confirmPassword) {
          setError((prevState) => ({
            ...prevState,
            confirm: "Passwords must match",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            confirm: "",
          }));
        }
      }
    }
  }, [
    fullName,
    email,
    password,
    confirmPassword,
    isTouched.fullName,
    isTouched.email,
    isTouched.passwordField,
    isTouched.confirm,
  ]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.confirm &&
      isTouched.fullName &&
      isTouched.email &&
      password.length &&
      email.length &&
      fullName.length &&
      confirmPassword.length &&
      !isError.passwordField.length &&
      !isError.fullName.length &&
      !isError.email.length &&
      !isError.confirm.length,
    [
      password,
      confirmPassword,
      email,
      fullName,
      isTouched.passwordField,
      isTouched.confirm,
      isTouched.fullName,
      isTouched.email,
      isError.fullName,
      isError.fullName,
      isError.confirm,
      isError.passwordField,
    ],
  );

  const onSignInClick = () => {};
  const onSubmitClick = () => {
    const registrationTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    const salt = generateKey();
    const hmac = calculateHMAC(salt, password);
    const data = {
      fullName,
      email,
      registrationTime,
      lastLoginTime: null,
      status: "Active",
      salt,
      password: hmac,
    };
  };

  return (
    <FormContainer
      title={"Sign Up"}
      btnTitle={"Sign Up"}
      onSubmit={onSubmitClick}
      additionalInfo={
        <div className={styles.additionalInfo}>
          Already have an account?
          <span onClick={onSignInClick} className={styles.signIn}>
            Sign In
          </span>
        </div>
      }
      isSubmitDisabled={!isSubmitValid}
    >
      <TextField
        error={!!isError.fullName}
        id="fullName"
        label="Full name"
        value={fullName}
        onChange={onChangeFullName}
        fullWidth
        helperText={isError.fullName}
      />
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
      />
      <TextField
        error={!!isError.confirm}
        id="confirmPassword"
        label="Confirm password"
        value={confirmPassword}
        onChange={onChangePasswordConfirm}
        fullWidth
        helperText={isError.confirm}
      />
    </FormContainer>
  );
};

export default SignUp;
