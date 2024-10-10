import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => {
    return (
        <Link
            to='/select-user-type'
        >
            <button
                type='button'
                className='bg-bl text-black font-bold rounded-lg px-7 py-2'
                >
                Sign Up
            </button>
        </Link>
    );
};

export default SignupButton;