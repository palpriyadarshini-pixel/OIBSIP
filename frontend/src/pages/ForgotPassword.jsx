import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to send email"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;