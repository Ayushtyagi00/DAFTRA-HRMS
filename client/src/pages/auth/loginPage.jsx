import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import login_bg from "../../assets/images/login_bg.png";
import Logo from "../../assets/images/DAFTAR_white.png";
import authAPI from "../../server/authApi.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname === "/register" ? "register" : "login";

  const [formData, setFormData] = useState({
    companyId: "",
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSSOLogin = async (provider) => {
    setLoading(true);
    setError("");
    try {
      // your SSO auth call here, e.g. redirect to provider OAuth flow
      console.log("SSO login with", provider);
    } catch (err) {
      setError(err.message || "SSO login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login(
        formData.email,
        formData.password,
      );

      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.user?.role || "employee");
        const userId = response.user?.id || response.user?.userId;
        if (!userId) {
          setError("Login response did not include a user ID.");
          return;
        }
        localStorage.setItem("userId", String(userId));
        navigate(`/dashboard/${userId}`, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // your registration API call here
      const response = await authAPI.signup(
        registerData.name,
        registerData.company,
        registerData.email,
        registerData.password,
      );
      console.log("Register submit");

      // Continue to workspace membership after account creation.
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", "hradmin");
        const userId = response.user?.id || response.user?.userId;
        if (!userId) {
          setError("Registration response did not include a user ID.");
          return;
        }
        localStorage.setItem("userId", String(userId));
        navigate("/workspace", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Full-width Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={login_bg}
          alt="Industrial Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      </div>

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-evenly w-1/2 p-12 relative z-10">
        <img
          src={Logo}
          alt="Logo"
          className="h-40 w-auto self-start bg-center"
        />

        <div>
          <h1 className="font-display font-bold text-white text-4xl leading-tight mb-4">
            One Platform for
            <br />
            Your Entire Workforce
          </h1>
          <p className="text-blue-200 text-base leading-relaxed mb-8 max-w-md">
            Manage payroll, attendance, leave, and performance — all in one
            place. Built for the pace and compliance needs of Indian businesses.
          </p>

          <div className="flex gap-8 mb-8">
            {[
              { value: "1,000+", label: "Companies Onboarded" },
              { value: "2M+", label: "Employees Managed" },
              { value: "99.7%", label: "Payroll Accuracy" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-bold text-white text-2xl">
                  {stat.value}
                </p>
                <p className="text-blue-300 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Leave & Attendance",
            "Performance Reviews",
            "Employee Onboarding",
            "Compliance Management",
            "Expense Management",
            "Project Management",
            "Task Management",
            "Team Meetings",
          ].map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 text-xs font-medium rounded-full text-blue-200"
              style={{
                background: "rgba(37,99,235,0.2)",
                border: "1px solid rgba(37,99,235,0.3)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          {/* <Logo className="h-10 w-auto lg:hidden mb-8" variant="dark" /> */}

          <div className="mb-6">
            <h2 className="font-display font-bold text-slate-900 text-2xl mb-1">
              {mode === "login" ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-slate-900 text-sm">
              {mode === "login" ? (
                <>
                  Access your <b>DAFTAR</b> dashboard
                </>
              ) : (
                <>
                  Get started with <b>DAFTAR</b> in minutes
                </>
              )}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* SSO Options — single row, compact */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSSOLogin("google")}
              disabled={loading}
              title="Continue with Google"
              className="flex items-center justify-center gap-1.5 py-2 px-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.68-3.87 2.68-6.62z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.95 10.7A5.41 5.41 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z"
                />
              </svg>
              <span className="truncate">Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSSOLogin("microsoft")}
              disabled={loading}
              title="Continue with Microsoft"
              className="flex items-center justify-center gap-1.5 py-2 px-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 23 23"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
              </svg>
              <span className="truncate">Microsoft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSSOLogin("zoho")}
              disabled={loading}
              title="Continue with Zoho"
              className="flex items-center justify-center gap-1.5 py-2 px-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  fill="#C8202F"
                  d="M12 1 3 6.2v11.6L12 23l9-5.2V6.2L12 1Z"
                />
                <path
                  fill="#fff"
                  d="M12 4.3 6 7.8v8.4l6 3.5 6-3.5V7.8L12 4.3Zm0 3 3.2 1.9v3.8L12 14.9l-3.2-1.9V9.2L12 7.3Z"
                />
              </svg>
              <span className="truncate">Zoho</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {mode === "login" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Manufacturing Pvt Ltd"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={registerData.company}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Work Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          {/* Toggle between Login / Register */}
          <p className="text-center text-sm text-slate-600 mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    navigate("/register");
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    navigate("/login");
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign In
                </button>
              </>
            )}
          </p>

          <p className="text-center text-xs text-slate-500 mt-8">
            <b>Secured by DAFTAR &bull; Made in India 🇮🇳</b>
          </p>
        </div>
      </div>
    </div>
  );
}
