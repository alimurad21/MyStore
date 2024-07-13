import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../Constant/apiConstant.js';

function Header({ userLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    const renderLogout = () => {
        if (location.pathname === '/home') {
            return (
                <div className="ml-auto flex items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleLogout}>
                        Logout
                    </button>
                    <span className="text-white">{userLoggedIn}</span>
                </div>
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        navigate('/login');
    };

    return (
        <nav className="bg-slate-500 h-16 flex items-center">
            <ul className="flex items-center w-full pl-4 gap-6">
                <li>
                    <Link className="text-white text-lg font-bold mr-12 md:mr-40" to="/home">P_APP</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/home">Home</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/contact">Contact</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/about">About</Link>
                </li>
                <li className="ml-auto">
                    {renderLogout()}
                </li>
            </ul>
        </nav>
    );
}

export default Header;
