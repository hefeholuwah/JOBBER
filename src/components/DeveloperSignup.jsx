import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";

const DeveloperSignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            console.log("Developer signup form submitted:", {
                name,
                email,
                skills,
                portfolioUrl,
            });

            setShowSuccessMessage(true);

            // Save user data to Realtime Database
            const db = getDatabase();
            await set(ref(db, "developers/" + user.uid), {
                name,
                email,
                skills,
                portfolioUrl,
            });

            // Redirect after successful signup
            navigate("/jobs");
        } catch (error) {
            console.error("Error submitting signup form:", error);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google sign-up successful:", user);

            setShowSuccessMessage(true);

            // Save user data to Realtime Database
            const db = getDatabase();
            await set(ref(db, "developers/" + user.uid), {
                name: user.displayName || "Unknown",
                email: user.email,
                skills: "Google Sign-up", // You can add skill collection later for Google users
                portfolioUrl: "",
            });

            // Redirect after successful signup
            navigate("/jobs");
        } catch (error) {
            console.error("Error during Google sign-up:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="absolute top-4 left-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-auto h-12 cursor-pointer"
                        onClick={() => navigate("/")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
                    />
                </div>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Join as a developer</h2>
                    <p className="text-gray-600">
                        Create your account to find remote development jobs
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                        <textarea
                            id="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">Portfolio URL</label>
                        <input
                            type="url"
                            id="portfolioUrl"
                            value={portfolioUrl}
                            onChange={(e) => setPortfolioUrl(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up with Google
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm">
                        Not a developer? <Link to="/signup/hirer" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up as a Hirer</Link>
                    </p>
                    <p className="text-sm mt-2">
                        Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeveloperSignupForm;