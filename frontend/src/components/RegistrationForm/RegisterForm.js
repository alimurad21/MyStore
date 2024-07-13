import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstant';

const RegisterForm = (props) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        successMessage: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const sendDetailsToServer = () => {
        if (state.email.length && state.password) {
            props.showError(null);
            const payload = {
                'username': state.username,
                'email': state.email,
                'password': state.password
            };
            axios.post(`${API_BASE_URL}/api/user/register`, payload)
                .then((response) => {
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState,
                            successMessage: 'Register successfully. Redirecting to Home page...'
                        }));
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                        props.showError(null);
                    } else {
                        props.showError('Some error occurred!');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    props.showError('Some error occurred!');
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer();
        } else {
            props.showError("Passwords don't match");
        }
    };

    const redirectToHome = () => {
        navigate('/home');
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        placeholder='Enter Username'
                        id='username'
                        value={state.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        placeholder='Enter Email address'
                        id='email'
                        value={state.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        placeholder='Enter Password'
                        type='password'
                        id='password'
                        value={state.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        placeholder='Confirm Password'
                        type='password'
                        id='confirmPassword'
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </label>
                <button type='submit'>Sign Up</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={redirectToLogin}>Login here</span>
            </div>
        </div>
    );
};

export default RegisterForm;
