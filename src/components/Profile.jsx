import React, { useState, useEffect } from 'react';
import { auth, db, onAuthStateChanged, ref, onValue, set } from '../firebase/firebase';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [userType, setUserType] = useState(null);

    // Common fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Developer-specific fields
    const [skills, setSkills] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');

    // Hirer-specific fields
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (user) {
                // Check if user is a developer or hirer
                const developerRef = ref(db, `developers/${user.uid}`);
                const hirerRef = ref(db, `hirers/${user.uid}`);

                onValue(developerRef, (snapshot) => {
                    if (snapshot.exists()) {
                        setUserType('developer');
                        const data = snapshot.val();
                        setProfileData(data);
                        setName(data.name || '');
                        setEmail(user.email || '');
                        setSkills(data.skills || '');
                        setPortfolioUrl(data.portfolioUrl || '');
                        setLoading(false);
                    } else {
                        // If not a developer, check if hirer
                        onValue(hirerRef, (snapshot) => {
                            if (snapshot.exists()) {
                                setUserType('hirer');
                                const data = snapshot.val();
                                setProfileData(data);
                                setName(data.name || '');
                                setEmail(user.email || '');
                                setCompany(data.company || '');
                                setRole(data.role || '');
                            }
                            setLoading(false);
                        });
                    }
                });
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSaveProfile = () => {
        if (currentUser) {
            const userRef = ref(db, `${userType}s/${currentUser.uid}`);
            const updatedData = userType === 'developer'
                ? { name, skills, portfolioUrl }
                : { name, company, role };

            set(userRef, {
                ...profileData,
                ...updatedData
            });
            setIsEditing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl pt-32">
            <div className="bg-sky-700 shadow-lg rounded-lg overflow-hidden text-white">
                <div className="bg-sky-800 p-6">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    {userType && (
                        <span className="inline-block bg-sky-100 text-sky-800 text-sm px-2 py-1 rounded-full mt-2">
                            {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </span>
                    )}
                </div>

                <div className="p-6">
                    {currentUser && profileData ? (
                        <div>
                            {!isEditing ? (
                                <div className="space-y-4">
                                    <p className="text-sky-100"><span className="font-semibold text-sky-200">Email:</span> {email}</p>
                                    <p className="text-sky-100"><span className="font-semibold text-sky-200">Name:</span> {name}</p>

                                    {/* Developer-specific fields */}
                                    {userType === 'developer' && (
                                        <>
                                            <p className="text-sky-100"><span className="font-semibold text-sky-200">Skills:</span> {skills || 'No skills listed.'}</p>
                                            <p className="text-sky-100"><span className="font-semibold text-sky-200">Portfolio URL:</span> {portfolioUrl || 'No URL provided.'}</p>
                                        </>
                                    )}

                                    {/* Hirer-specific fields */}
                                    {userType === 'hirer' && (
                                        <>
                                            <p className="text-sky-100"><span className="font-semibold text-sky-200">Company:</span> {company || 'Not specified.'}</p>
                                            <p className="text-sky-100"><span className="font-semibold text-sky-200">Role:</span> {role || 'Not specified.'}</p>
                                        </>
                                    )}

                                    {/* Updated button color to #7DD3FC */}
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="mt-4 bg-[#7DD3FC] text-sky-800 px-4 py-2 rounded-full hover:bg-sky-300 transition duration-300"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            ) : (
                                // Edit mode
                                <div className="space-y-4">
                                    {/* Common fields */}
                                    <div>
                                        <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            disabled
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                        />
                                    </div>

                                    {/* Developer-specific fields */}
                                    {userType === 'developer' && (
                                        <>
                                            <div>
                                                <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="skills">
                                                    Skills
                                                </label>
                                                <textarea
                                                    id="skills"
                                                    value={skills}
                                                    onChange={(e) => setSkills(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                                    rows="3"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="portfolioUrl">
                                                    Portfolio URL
                                                </label>
                                                <input
                                                    type="url"
                                                    id="portfolioUrl"
                                                    value={portfolioUrl}
                                                    onChange={(e) => setPortfolioUrl(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Hirer-specific fields */}
                                    {userType === 'hirer' && (
                                        <>
                                            <div>
                                                <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="company">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sky-200 text-sm font-bold mb-2" htmlFor="role">
                                                    Role
                                                </label>
                                                <input
                                                    type="text"
                                                    id="role"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-sky-800 leading-tight focus:outline-none focus:shadow-outline bg-sky-100"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Updated button colors */}
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="bg-[#7DD3FC] text-sky-800 px-4 py-2 rounded-full hover:bg-sky-300 transition duration-300"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600 transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-sky-100">No profile data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}