import { Link } from 'react-router-dom'


const LoginButton = () => {
    return (
        <Link to="/login">
            <button variant="ghost" className="text-white hover:text-gray-200">
                Log In
            </button>
        </Link>
    )
}

export default LoginButton;