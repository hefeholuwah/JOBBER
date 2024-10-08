import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeveloperSignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skills, setSkills] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            console.log('Developer signup form submitted:', {
                name,
                email,
                password,
                skills,
                portfolioUrl,
            });
            navigate('/jobs');
        } catch (error) {
            console.error('Error submitting signup form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Developer Signup</h2>

            
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

            
            <div className="mb-4">
                <label htmlFor="skills" className="block mb-2">Skills</label>
                <textarea
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            
            <div className="mb-4">
                <label htmlFor="portfolioUrl" className="block mb-2">Portfolio URL</label>
                <input
                    type="url"
                    id="portfolioUrl"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
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

export default DeveloperSignupForm;
