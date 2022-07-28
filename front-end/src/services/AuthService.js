import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';

const URL_BACKEND = 'http://127.0.0.1:8008/api/users/'

export function signUp(first_name, last_name, email, password, age) {

    const postData = {
        first_name,
        last_name,
        email,
        password,
        age,
    };

    return axios.post(
        URL_BACKEND,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        `${URL_BACKEND}login_api/`,
        postData
    );
}

export function updateProfile(token, id, first_name, last_name, email, password, age) {
    const postData = {
        first_name,
        last_name,
        email,
        password,
    };

    return axios.put(
        `${URL_BACKEND}${id}/`,
        postData,
        { token: token }
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            swal("Oops", "Email ya existe", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            swal("Oops", "Email not found", "error", { button: "Try again!", });
            break;
        case 'INVALID_PASSWORD':
            swal("Oops", "Wrong password", "error", { button: "Try again!", });
            break;
        case 'USER_NOT_ACTIVE':
            swal("Oops", "Usuario is not active to use this app", "error", { button: "Try later", });
            break;
        case 'INVALID_DATA':
            try {
                Object.keys(errorResponse.error.data).map((field) => {
                    let errorMessage = errorResponse.error.data[field].toString()
                    swal("Oops", `${field}: ${capitalize(errorMessage)}`, "error", { button: "Try again!", });
                })
            } catch (error) {
                console.log(error);
            }
            break;
        case 'SERVER_ERROR':
            swal("Oops", "Server Error", "error", { button: "Try again!", });
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    dispatch(loginConfirmedAction(tokenDetails));
};

const capitalize = (word) => (
    word
      .toLowerCase()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase())
);
