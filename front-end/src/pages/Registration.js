import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../store/actions/AuthActions';
// import swal from "sweetalert";

const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regexNumbers = /^\d+$/;

function Register(props) {
    const [email, setEmail] = useState('admin@admin.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('abcd12345');
    const [firstName, setFirstName] = useState('test');
    const [lastName, setLastName] = useState('test test');
    const [age, setAge] = useState(18);

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (firstName === '') {
            errorObj.firstName = 'First name is required';
            error = true;
        } else if (!regexText.test(firstName)) {
            errorObj.firstName = 'Only letter are allowed in this field';
            error = true;
        }

        if (lastName === '') {
            errorObj.lastName = 'Last name is required';
            error = true;
        } else if (!regexText.test(lastName)) {
            errorObj.lastName = 'Only letter are allowed in this field';
            error = true;
        }

        if (email === '') {
            errorObj.email = 'Email is required';
            error = true;
        }

        if (password === '') {
            errorObj.password = 'Password is required';
            error = true;
        }

        if (password.length < 8) {
            errorObj.password = 'Password is too short (try more than 8 characters)';
            error = true;
        }

        if (age < 12) {
            errorObj.age = 'You are too young to sign up';
            error = true;
        } else if (!regexNumbers.test(age)) {
            errorObj.age = 'Only number is allowed in this field';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(firstName, lastName, email, password, age, props.history));
    }
    return (
        <div className='authincation h-100 p-meddle'>
            <div className='container h-100'>
                <div className='row justify-content-center h-100 align-items-center'>
                    <div className='col-lg-6'>
                        <div className='card p-5 bg-light'>
                            <div className='row no-gutters'>
                                <div className='col-xl-12'>
                                    <div className='auth-form'>
                                        <h4 className='text-center mb-4'>Sign up today!</h4>
                                        <form onSubmit={onSignUp}>
                                            <div className='form-group'>
                                                <label className='mb-1'>
                                                    <strong>First name</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={firstName}
                                                    placeholder='first name'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                                {errors.firstName && <div className="fs-12 text-danger">*{errors.firstName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1'>
                                                    <strong>Last name</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={lastName}
                                                    placeholder='last name'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                                {errors.lastName && <div className="text-danger fs-12">*{errors.lastName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1'>
                                                    <strong>Email</strong>
                                                </label>
                                                <input type="email" className="form-control mb-1"
                                                    value={email}
                                                    placeholder='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <div className="text-danger fs-12">*{errors.email}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1'>
                                                    <strong>Password</strong>
                                                </label>
                                                <input type="password" className="form-control mb-1"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    placeholder='password'
                                                />
                                                {errors.password && <div className="text-danger fs-12">*{errors.password}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1'>
                                                    <strong>Age {'(years)'}</strong>
                                                </label>
                                                <input type="number" className="form-control mb-1"
                                                    value={age}
                                                    min={0}
                                                    max={99}
                                                    onChange={(e) =>
                                                        setAge(e.target.value)
                                                    }
                                                />
                                                {errors.age && <div className="text-danger fs-12">*{errors.age}</div>}
                                            </div>
                                            <div className='text-center mt-4'>
                                                <input type='submit' className='btn btn-primary text-ligth btn-block' value="Sign up" />
                                            </div>
                                        </form>
                                        <div className='mt-3'>
                                            <p>
                                                Do you already have an account?{' '}
                                                <Link className='font-weight-bold' to='/login'>
                                                    Log in here.
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);
