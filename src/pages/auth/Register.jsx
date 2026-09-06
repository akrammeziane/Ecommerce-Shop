import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/slices/authSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isNotMatchPassword) {
      setIsNotMatchPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("the form entered is ", formData);
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setIsNotMatchPassword(true);
      return;
    }
    try {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();
      navigate("/login", { replace: true, state: { email: formData.email } });
    } catch (err) {
      console.log("Error occured", err);
      // The rejected thunk populates the error shown below.
    }
  };

  return (
    <div className="min-h-[85vh] bg-primary flex items-center justify-center px-4 py-12">
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
            Join The Club
          </p>
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer">
            Create Account
          </h1>
          <p className="text-xs text-footer/60 mt-1">
            Sign up to unlock exclusive drops and order history.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-footer/40" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-black/10 bg-primary pl-10 pr-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-footer hover:text-primary disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 group mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                Register Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {(error || isNotMatchPassword) && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-700"
            >
              {isNotMatchPassword ? "Passwords do not match." : error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-black/10 text-center">
          <p className="text-xs text-footer/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold uppercase text-footer hover:text-accent underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
