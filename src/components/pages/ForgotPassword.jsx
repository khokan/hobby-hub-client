import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = async () => {
    if (!email) return toast.error("Please enter a valid email.");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent. Redirecting to Gmail...");
      window.location.href = "https://mail.google.com"; // Redirect to Gmail
    } catch (error) {
      toast.error("Failed to send reset email.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="input input-bordered w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="btn btn-primary w-full">
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;
