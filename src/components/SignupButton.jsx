import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => {
    return (
        <div className="container mx-auto flex items-center">
            <Link
            to="/select-user-type"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
                    Sign Up
            </Link>
        </div>
    );
};

export default SignupButton;