import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePageTitle } from '../utils'

const UserTypeSelection = () => {
    updatePageTitle("Join our platform");
    const navigate = useNavigate();

    const handleCardClick = (userType) => {
        navigate(`/signup/${userType}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl w-full px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Join Our Platform</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card
                        title="I am a client hiring for a project"
                        onClick={() => handleCardClick('hirer')}
                    />
                    <Card
                        title="I am a developer looking for work"
                        onClick={() => handleCardClick('developer')}
                    />
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, onClick }) => (
    <div
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition duration-300 hover:shadow-lg"
        onClick={onClick}
    >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600">Click here to get started</p>
    </div>
);

export default UserTypeSelection;
