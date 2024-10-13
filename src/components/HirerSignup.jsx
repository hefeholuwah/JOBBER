import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { AlertCircle } from 'lucide-react';
import SuccessNotification from './SuccessNotice';
import { generateAvatarUrl } from '../utils';
import { RxAvatar } from 'react-icons/rx';

export default function HirerSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validatePassword(password)) {
            setError('Password should be at least 6 characters long.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with display name and photo URL
            await updateProfile(user, {
                displayName: name,
                photoURL: generateAvatarUrl(name)
            });

            const db = getDatabase();
            await set(ref(db, 'hirers/' + user.uid), {
                name,
                email,
                company,
                role,
                avatarUrl: generateAvatarUrl(name)
            });

            setShowSuccessNotification(true);
            setTimeout(() => navigate('/jobs'), 5000);
        } catch (error) {
            console.error('Error submitting signup form:', error);
            setError(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const db = getDatabase();
            await set(ref(db, 'hirers/' + user.uid), {
                name: user.displayName || 'Unknown',
                email: user.email,
                company: 'Not specified',
                role: 'Not specified',
                avatarUrl: generateAvatarUrl(user.displayName || 'Unknown')
            });

            setShowSuccessNotification(true);
            setTimeout(() => navigate('/jobs'), 5000);
        } catch (error) {
            console.error('Error during Google sign-up:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Hirer Signup</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5EBAE7] hover:bg-[#3AA9E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5EBAE7]"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Sign Up with Google
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                    <p className="text-sm mt-2">
                        Not an employer?{' '}
                        <Link to="/signup/developer" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up as a Developer
                        </Link>
                    </p>
                </div>
            </div>
            {showSuccessNotification && (
                <SuccessNotification
                    message="Signup successful! Redirecting to jobs page..."
                    onClose={() => setShowSuccessNotification(false)}
                />
            )}
        </div>
    );
}