import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constant/apiConstant';

const LoginForm = ({showError, setUserLoggedIn}) => {
    const [state, setState] = useState({
        email: '',
        password: ''
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
            showError(null);
            const payload = {
                email: state.email,
                password: state.password
            };
            axios.post(`${API_BASE_URL}/api/user/login`, payload)
                .then((response) => {
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState,
                            successMessage: 'Login successful. Redirecting to Home page...'
                        }));
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                        setUserLoggedIn(state.email.substring(0,6))
                        showError(null);
                    } else {

                        showError('Invalid credentials');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    showError('Some error occurred!');
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendDetailsToServer();
    };

    const redirectToHome = () => {
        navigate('/home');
        
    };

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Login</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={redirectToRegister}>Register here</span>
            </div>
        </div>
    );
};

export default LoginForm;
