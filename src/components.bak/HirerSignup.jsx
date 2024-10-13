import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../firebase/firebase';

const HirerSignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //save user data to database
            const db = getDatabase();
            await set(ref(db, 'hirers/' + user.uid), {
                name,
                email,
                companyName,
                phoneNumber,
            });
            
            console.log('Hirer signup form submitted:', {
                name,
                email,
                password,
                companyName,
                phoneNumber,
            });
            navigate('/jobs'); // Redirect to jobs page after successful signup
        } catch (error) {
            console.error('Error submitting signup form:', error);
            setError('Failed to create an account. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Hirer Signup</h2>

            {/* Name field */}
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Email field */}
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Password field */}
            <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Company Name field */}
            <div className="mb-4">
                <label htmlFor="companyName" className="block mb-2">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Phone Number field */}
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Error message display */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Submit button */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Sign Up
            </button>
        </form>
    );
};

export default HirerSignupForm;