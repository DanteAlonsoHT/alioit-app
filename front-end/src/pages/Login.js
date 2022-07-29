import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadingToggleAction, loginAction } from "../store/actions/AuthActions";

function Login(props) {
  const [email, setEmail] = useState("test@test.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("abcd12345");
  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is required";
      error = true;
    }
    if (password.length < 8) {
      errorObj.password = "Password is too short (try more than 8 characters)";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  return (
    <div className="login-form-bx">
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-lg-12 col-md-7 d-flex flex-column justify-content-center align-items-center">
            <div className="card p-5 bg-light">
              <div className="mb-4 text-center">
                <h3 className="mb-3">Welcome!</h3>
                <p className="">Entry and discover the API power!</p>
              </div>
              {props.errorMessage && (
                <div className="alert alert-danger p-1 my-2">
                  {props.errorMessage}
                </div>
              )}
              {props.successMessage && (
                <div className="alert alert-success p-1 my-2">
                  {props.successMessage}
                </div>
              )}
              <form onSubmit={onLogin}>
                <div className="form-group">
                  <label className="mb-2 ">
                    <strong className="">Email</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-danger fs-12">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-2 ">
                    <strong className="">Password</strong>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="text-danger fs-12">{errors.password}</div>
                  )}
                </div>
                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                  <div className="form-group">
                    <div className="custom-control custom-checkbox ml-1 ">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="basic_checkbox_1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="basic_checkbox_1"
                      >
                        Remember my data
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block">
                    Log in
                  </button>
                </div>
              </form>
              <div className="new-account mt-2">
                <p className="mb-0">
                  Do you already have any account yet?{" "}
                  <Link className="text-black" to="/register">
                    Sign up here.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
