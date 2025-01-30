import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // Added role field
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate inputs
    if (!name || !email || !password) {
      setError("All fields are required.");
      toast.error("All fields are required."); // Show error toast
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      if (response.status === 200) {
        toast.success("Registration successful!"); // Show success toast
        navigate("/signin"); // Redirect to sign-in after successful registration
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to register. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      {/* Left Side (Image) */}
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Pattern Background"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign Up
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your details to create a new account.
          </Typography>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outlined" color="blue" className="flex items-center gap-2">
            F
          </Button>
          <Button variant="outlined" color="red" className="flex items-center gap-2">
            G+
          </Button>
          <Button variant="outlined" color="light-blue" className="flex items-center gap-2">
            in
          </Button>
        </div>

        <Typography variant="small" color="blue-gray" className="text-center mt-4">
          or use your email for registration
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography variant="small" color="red" className="text-center mt-4">
            {error}
          </Typography>
        )}

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Name Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="John Doe"
              name="name"
              value={name}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {/* Email Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {/* Password Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={password}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {/* Role Field */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Role
            </Typography>
            <select
              name="role"
              value={role}
              onChange={handleChange}
              className="border border-blue-gray-200 rounded-lg p-2 focus:border-gray-900"
            >
              <option value="client">Client</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            className="mt-6"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        {/* Sign In Link */}
        <Typography variant="small" color="blue-gray" className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </Typography>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}