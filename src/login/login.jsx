import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

// Axios instance 
const authApi = axios.create({
  baseURL: "book-library-login.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Input handler 
  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Submit handler
  const handleSubmit = async () => {
    setMsg("");

    const { name, email, password } = form;

    if (!email || !password || (!isLogin && !name)) {
      setMsg("All fields required");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await authApi.post("/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/profile", { replace: true });
      } else {
        const res = await authApi.post("/signup", form);
        setMsg(res.data.message || "Signup successful");
        setForm({ name: "", email: "", password: "" });
        setTimeout(() => setIsLogin(true), 1200);
      }
    } catch (err) {
      setMsg(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Network / Auth Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {msg && <p className="msg">{msg}</p>}

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={form.password}
            onChange={handleChange}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button type="submit" disabled={loading} className="login-button">
            {loading
              ? isLogin ? "Logging in..." : "Signing up..."
              : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account →" : "Already have an account →"}{" "}
          <span
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setForm({ name: "", email: "", password: "" });
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;