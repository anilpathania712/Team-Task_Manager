import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      alert(res.msg);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}