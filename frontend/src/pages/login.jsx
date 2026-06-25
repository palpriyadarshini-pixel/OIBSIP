import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
  useState(false);
  const [rememberMe, setRememberMe] =
  useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (rememberMe) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } else {
        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
        toast.error(
          error.response?.data?.message || "Login Failed"
        );
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>

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
            className="w-full p-3 border rounded mb-3"
          />

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-500 text-sm"
            >
              {showPassword
                ? " Hide Password"
                : " Show Password"}
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />

            <label>
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center">
          <span
            className="text-red-500 cursor-pointer font-semibold"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;