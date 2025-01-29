/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // If you are using React Router for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store the error message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation or spinner

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // If login is successful, store the token in localStorage (or cookies)
      localStorage.setItem("token", response.data.token);

      // Redirect to a different page (for example, dashboard)
      navigate("/dashboard"); // Replace with the actual page you want to navigate to
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
