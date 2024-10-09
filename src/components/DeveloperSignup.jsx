import { useNavigate } from "react-router-dom";
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
        <div className="min-h-screen relative">
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
            <div className="max-w-md mx-auto p-6 pt-20">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-2xl font-bold mb-4">Join as a developer</h4>

                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">
                            Name
                        </label>
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
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
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
                        <label htmlFor="password" className="block mb-2">
                            Password
                        </label>
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
                        <label htmlFor="skills" className="block mb-2">
                            Skills
                        </label>
                        <textarea
                            id="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="portfolioUrl" className="block mb-2">
                            Portfolio URL
                        </label>
                        <input
                            type="url"
                            id="portfolioUrl"
                            value={portfolioUrl}
                            onChange={(e) => setPortfolioUrl(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#2563EB] hover:bg-[#1e40af] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-lg transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="bg-[#2563EB] hover:bg-[#1e40af] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-lg transform hover:scale-105"
                        >
                            Sign Up with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeveloperSignupForm;