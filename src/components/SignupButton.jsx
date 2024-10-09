import { Link } from 'react-router-dom';

const SignupButton = () => {
    return (
        <div className="container mx-auto flex items-center">
            <Link
            to="/select-user-type"
            className="bg-bl text- font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
                    Sign Up
            </Link>
        </div>
    );
};

export default SignupButton;