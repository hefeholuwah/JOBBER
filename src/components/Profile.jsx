import { useState, useEffect } from 'react';
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
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            {currentUser && profileData ? (
                <div>
                    {/* Display mode */}
                    {!isEditing ? (
                        <div>
                            <p className="mb-2"><span className="font-semibold">Email:</span> {email}</p>
                            <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
                            <p className="mb-2"><span className="font-semibold">User Type:</span> {userType}</p>

                            {/* Developer-specific fields */}
                            {userType === 'developer' && (
                                <>
                                    <p className="mb-2"><span className="font-semibold">Skills:</span> {skills || 'No skills listed.'}</p>
                                    <p className="mb-2"><span className="font-semibold">Portfolio URL:</span> {portfolioUrl || 'No URL provided.'}</p>
                                </>
                            )}

                            {/* Hirer-specific fields */}
                            {userType === 'hirer' && (
                                <>
                                    <p className="mb-2"><span className="font-semibold">Company:</span> {company || 'Not specified.'}</p>
                                    <p className="mb-2"><span className="font-semibold">Role:</span> {role || 'Not specified.'}</p>
                                </>
                            )}

                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        // Edit mode
                        <div>
                            {/* Common fields */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    disabled
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Developer-specific fields */}
                            {userType === 'developer' && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                                            Skills
                                        </label>
                                        <textarea
                                            id="skills"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portfolioUrl">
                                            Portfolio URL
                                        </label>
                                        <input
                                            type="url"
                                            id="portfolioUrl"
                                            value={portfolioUrl}
                                            onChange={(e) => setPortfolioUrl(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Hirer-specific fields */}
                            {userType === 'hirer' && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </>
                            )}

                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
}