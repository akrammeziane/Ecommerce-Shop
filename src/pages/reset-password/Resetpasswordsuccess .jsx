import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ResetPasswordSuccess() {
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

        <div className="text-center py-4">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-accent/30 bg-accent/5">
            <CheckCircle2 className="h-6 w-6 text-accent" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mb-2">
            All Set
          </p>
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-footer">
            Password Changed
          </h1>
          <p className="text-xs text-footer/60 mt-2 leading-relaxed">
            Your password has been updated successfully. You can now sign in
            with your new password.
          </p>

          <Link
            to="/login"
            className="mt-8 w-full bg-footer text-primary py-3.5 px-6 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer flex items-center justify-center gap-2 group"
          >
            Continue to Sign In
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-black/10 text-center">
          <p className="text-xs text-footer/70">
            Didn't request this change?{" "}
            <a
              href="#"
              className="font-bold uppercase text-footer hover:text-accent underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
