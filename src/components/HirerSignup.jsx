import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; 
import { getDatabase, ref, set } from "firebase/database";

const HirerSignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            console.log("Hirer signup form submitted:", {
                name,
                email,
                company,
                role,
            });

            
            const db = getDatabase();
            await set(ref(db, "hirers/" + user.uid), {
                name,
                email,
                company,
                role,
            });

            
            navigate("/jobs");
        } catch (error) {
            console.error("Error submitting signup form:", error);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google sign-up successful:", user);

            
            const db = getDatabase();
            await set(ref(db, "hirers/" + user.uid), {
                name: user.displayName || "Unknown",
                email: user.email,
                company: "Google Sign-up", 
                role: "Unknown",
            });

        
            navigate("/jobs");
        } catch (error) {
            console.error("Error during Google sign-up:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
            <h4 className="text-2xl font-bold mb-4">Join as an Employer</h4>

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
                <label htmlFor="company" className="block mb-2">
                    Company
                </label>
                <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="role" className="block mb-2">
                    Role
                </label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
    );
};

export default HirerSignupForm;
