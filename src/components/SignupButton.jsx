import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => {
    return (
        <div className="bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Job Platform</h1>
                <Link
                    to="/select-user-type"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignupButton;