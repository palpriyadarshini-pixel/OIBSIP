import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
    toast.warning("Passwords do not match");
    return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Reset failed"
      );
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 border rounded mb-4"
        />

        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
            setConfirmPassword(e.target.value)
        }
        className="w-full p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;