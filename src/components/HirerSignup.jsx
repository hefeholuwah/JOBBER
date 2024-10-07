import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; // Import auth
import { getDatabase, ref, set } from "firebase/database"; // Import Firebase Database functions

const HirerSignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // Google Auth Provider instance

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create user with email and password
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

      // Save hirer data to Realtime Database
      const db = getDatabase();
      await set(ref(db, "hirers/" + user.uid), {
        name,
        email,
        company,
        role,
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

      // Save hirer data to Realtime Database
      const db = getDatabase();
      await set(ref(db, "hirers/" + user.uid), {
        name: user.displayName || "Unknown",
        email: user.email,
        company: "Google Sign-up", // You can update company info later
        role: "Unknown",
      });

      // Redirect after successful signup
      navigate("/jobs");
    } catch (error) {
      console.error("Error during Google sign-up:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Hirer Signup</h2>

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

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Sign Up
      </button>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign Up with Google
      </button>
    </form>
  );
};

export default HirerSignupForm;
