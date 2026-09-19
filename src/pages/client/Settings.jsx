import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { changePassword } from "../../slices/usersSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const { passwordLoading, passwordError } = useSelector(
    (state) => state.users,
  );

  const SavedUser = JSON.parse(localStorage.getItem("user"));
  const userId = SavedUser?._id || SavedUser?.id;

  const [showPasswords, setShowPasswords] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setFormError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 8) {
      setFormError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    try {
      await dispatch(
        changePassword({ userId, currentPassword, newPassword }),
      ).unwrap();
      setSuccessMsg("Password updated successfully.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-footer">
        Account Settings
      </h2>

      <div className="border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 text-accent flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-footer">
              Change Password
            </p>
            <p className="text-xs text-footer/60">
              Use a strong password you don&apos;t use elsewhere.
            </p>
          </div>
        </div>

        {passwordError && (
          <div
            role="alert"
            className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm mb-5"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{passwordError}</p>
          </div>
        )}
        {formError && (
          <div
            role="alert"
            className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm mb-5"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{formError}</p>
          </div>
        )}
        {successMsg && (
          <div
            role="status"
            className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm mb-5"
          >
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p>{successMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
              Current Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
              New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
              autoComplete="new-password"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords((s) => !s)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-footer/60 hover:text-footer transition-colors"
          >
            {showPasswords ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            {showPasswords ? "Hide" : "Show"} Passwords
          </button>

          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {passwordLoading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
