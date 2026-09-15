import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendForgetPasswordEmail } from "@/slices/forgetPasswordSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await dispatch(sendForgetPasswordEmail(email)).unwrap();
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 600);
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

        {!sent ? (
          <>
            <div className="text-center mb-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-2">
                Account Recovery
              </p>
              <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer">
                Reset Password
              </h1>
              <p className="text-xs text-footer/60 mt-1">
                Enter the email linked to your account and we'll send you a link
                to reset your password.
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-footer text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
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
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-accent/30 bg-accent/5">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-2">
              Check Your Inbox
            </p>
            <h1 className="font-heading text-2xl font-black uppercase tracking-tight text-footer">
              Link Sent
            </h1>
            <p className="text-xs text-footer/60 mt-2 leading-relaxed">
              We've sent a password reset link to{" "}
              <span className="font-bold text-footer">
                {email || "your email"}
              </span>
              . It'll expire in 15 minutes.
            </p>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest text-footer hover:text-accent underline disabled:opacity-50"
            >
              Didn't get it? Resend
            </button>
          </div>
        )}

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
