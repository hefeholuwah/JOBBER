// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { auth, db, onAuthStateChanged, ref, onValue, set } from '../firebase/firebase';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aboutMe, setAboutMe] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setProfileData(data);
                        setAboutMe(data.aboutMe || '');
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSaveAboutMe = () => {
        if (currentUser) {
            const userRef = ref(db, `users/${currentUser.uid}`);
            set(userRef, { ...profileData, aboutMe });
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
                    <p className="mb-2"><span className="font-semibold">Email:</span> {currentUser.email}</p>
                    <p className="mb-2"><span className="font-semibold">Name:</span> {profileData.name}</p>
                    <p className="mb-2"><span className="font-semibold">User Type:</span> {profileData.userType}</p>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">About Me</h2>
                        {isEditing ? (
                            <div>
                                <textarea
                                    value={aboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                />
                                <button
                                    onClick={handleSaveAboutMe}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="mb-2">{profileData.aboutMe || 'No information provided.'}</p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
};

export default Profile;