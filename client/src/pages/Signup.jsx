import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await signupUser(form);

    if (res.msg === "User registered successfully") {
      alert("Signup successful");
      navigate("/");
    } else {
      alert(res.msg);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
          onClick={handleSignup}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Signup
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}