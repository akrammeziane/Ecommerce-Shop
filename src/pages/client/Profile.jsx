import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  LoaderCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { editUser, fetchUserById } from "../../slices/usersSlice";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

export default function Profile() {
  const dispatch = useDispatch();
  const SavedUserInitial = JSON.parse(localStorage.getItem("user"));
  const userId = SavedUserInitial?._id || SavedUserInitial?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const { loading, error } = useSelector((state) => state.users);
  const { user: savedUser } = useSelector((state) => state.users);

  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    address: savedUser?.address || "",
  });

  const joinDate = formatDate(savedUser?.createdAt);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMsg("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: savedUser?.name || "",
      email: savedUser?.email || "",
      phone: savedUser?.phone || "",
      address: savedUser?.address || "",
    });
  };

  const handleSave = async () => {
    try {
      await dispatch(editUser({ userId, userData: formData })).unwrap();
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully.");
    } catch {
      // error is already surfaced via `error` from the slice
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-footer">
        My Profile
      </h2>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {successMsg && !isEditing && (
        <div
          role="status"
          className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm"
        >
          <CheckCircle className="h-5 w-5 shrink-0" />
          <p>{successMsg}</p>
        </div>
      )}

      <div className="border border-black/10 bg-white">
        {/* Identity Strip */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-black/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center text-primary shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-footer">
                {savedUser?.name || "N/A"}
              </p>
              <p className="text-xs text-footer/60 mt-0.5">
                Member since {joinDate}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-black/10 text-xs font-bold uppercase tracking-[0.15em] text-footer hover:bg-black/5 transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>

        {/* Info / Form */}
        <div className="p-6 sm:p-8">
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-footer/50">
                    Email
                  </p>
                  <p className="text-footer font-medium mt-0.5">
                    {savedUser?.email || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-footer/50">
                    Phone
                  </p>
                  <p className="text-footer font-medium mt-0.5">
                    {savedUser?.phone || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 md:col-span-2">
                <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-footer/50">
                    Address
                  </p>
                  <p className="text-footer font-medium mt-0.5">
                    {savedUser?.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-footer/60 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-hero border border-black/10 text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-accent text-primary text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 border border-black/10 text-footer text-xs font-bold uppercase tracking-[0.15em] hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
