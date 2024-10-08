import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HirerSignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Here you would typically send a POST request to your server
            // with the collected form data
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Hirer Signup</h2>

            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Company Name */}
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

            {/* Phone Number */}
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