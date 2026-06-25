import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
  useState("");
  const [showPassword, setShowPassword] =
  useState(false);


  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
            toast.warning("Passwords do not match");
            return;
          }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-blue-500 text-sm"
            >
              {showPassword
                ? " Hide Password"
                : " Show Password"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;