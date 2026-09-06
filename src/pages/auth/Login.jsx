import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? "/admin" : "/account", { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-[80vh] bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md border border-black/10 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
          <Link
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest text-footer/60 hover:text-accent transition flex items-center gap-1"
          >
            ← Back to Store
          </Link>
          <Link
            to="/"
            className="font-heading text-lg font-black uppercase tracking-tighter text-footer"
          >
            TALQIN
          </Link>
        </div>
        <div className="text-center mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-2">
            Member Access
          </p>
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer">
            Welcome Back
          </h1>
          <p className="text-xs text-footer/60 mt-1">
            Sign in to access your orders and account details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer">
                Password
              </label>
              <a
                href="#"
                className="text-[10px] uppercase tracking-wider text-accent hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-footer text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {error && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-700"
            >
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-black/10 text-center">
          <p className="text-xs text-footer/70">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold uppercase text-footer hover:text-accent underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
