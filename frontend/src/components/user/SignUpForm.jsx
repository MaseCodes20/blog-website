import React, { useEffect, useState } from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { close } from "../../features/modals/connectModalSlice";
import { deselectSignUp } from "../../features/user/formSelectorSlice";
import ShowPasswordButton from "./ShowPasswordButton";
import { allUsers } from "../../features/users/usersSlice";

function SignUpForm() {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordInputType, setPasswordInputType] = useState("password");

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleInputs = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const generateUsername = () => {
    const nameArray = name?.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return `${firstName[0]}${lastName}${randomNumber}`;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    let userData = {
      name,
      username: generateUsername(),
      email,
      password,
    };

    dispatch(register(userData));
  };

  const showConfirmPassword = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      dispatch(close());
      dispatch(allUsers());
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);

  return (
    <div>
      <button
        className="signInOrSignUpFormBackButton"
        onClick={() => dispatch(deselectSignUp())}
      >
        <ArrowNarrowLeftIcon className="signInOrSignUpFormBackIcon" />
      </button>

      <h1 className="signInOrSignUpTitle">Sign up with email</h1>
      <p className="signInOrSignUpPTag">
        Enter your email address to create an account.
      </p>
      <form onSubmit={submitForm} className="signInOrSignUpFormContainer">
        <div className="signInOrSignUpInputContainer">
          <label htmlFor="name" className="signInOrSignUpFormLabel">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputs}
            className="signInOrSignUpFormInput"
            // required
          />
        </div>

        <div className="signInOrSignUpInputContainer">
          <label htmlFor="email" className="signInOrSignUpFormLabel">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputs}
            className="signInOrSignUpFormInput"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="signInOrSignUpFormLabel">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputs}
            className="signInOrSignUpFormInput"
            required
          />
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="confirmPassword" className="signInOrSignUpFormLabel">
            Confirm password
          </label>
          <input
            type={passwordInputType}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputs}
            className="signInOrSignUpFormInput"
            required
          />
          {confirmPassword !== "" && (
            <ShowPasswordButton showFunction={showConfirmPassword} />
          )}
        </div>

        <div className="h-[20px] flex items-center justify-center">
          {password !== confirmPassword &&
            confirmPassword !== "" &&
            password && (
              <p className="signInOrSignUpFormError">Passwords don't match</p>
            )}
        </div>

        <input
          type="submit"
          value="Sign up"
          className="signInOrSignUpFormButton"
        />
      </form>
    </div>
  );
}

export default SignUpForm;
