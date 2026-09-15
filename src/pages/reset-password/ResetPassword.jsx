import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendForgetPasswrodPage,
  resetPassword,
} from "@/slices/forgetPasswordSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(sendForgetPasswrodPage({ userId, token }));
  }, [dispatch, userId, token]);
  const { forgetPasswordError } = useSelector((state) => state.forgetPassword);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);

  if (forgetPasswordError) {
    return (
      <div className="min-h-[80vh] bg-primary flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border border-black/10 bg-white p-8 shadow-sm text-center">
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer mb-4">
            Invalid or Expired Link
          </h1>
          <p className="text-xs text-footer/60 mb-6">
            The password reset link is invalid or has expired. Please request a
            new password reset.
          </p>
          <Link
            to="/forgot-password"
            className="bg-footer text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isNotMatchPassword) setIsNotMatchPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setIsNotMatchPassword(true);
      return;
    }
    setLoading(true);
    try {
      await dispatch(
        resetPassword({ userId, token, password: formData.password }),
      ).unwrap();
      setLoading(false);
      navigate("/reset-password-success", { replace: true });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
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
            Account Recovery
          </p>
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer">
            Set New Password
          </h1>
          <p className="text-xs text-footer/60 mt-1">
            Choose a new password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-footer mb-2">
              New Password
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
              Confirm New Password
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

          <p className="text-[10px] text-footer/50 leading-relaxed">
            Use at least 8 characters, mixing letters and numbers for a stronger
            password.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-footer text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                Reset Password
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
            Remembered your password?{" "}
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
