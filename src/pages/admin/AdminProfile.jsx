import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { editUser } from "../../slices/adminSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error } = useSelector((state) => state.admin);
  const SavedUser = JSON.parse(localStorage.getItem("user"));
  const { name, email, createdAt, phone, address } = SavedUser || {};
  const isoString = createdAt || new Date().toISOString();
  const dispatch = useDispatch();

  const formattedDate = new Date(isoString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const [FirstName, LastName] = name ? name.split(" ") : ["Admin", "User"];

  const [profile, setProfile] = useState({
    name: name || `${FirstName} ${LastName}`,
    email: email || "Admin Email",
    joinDate: formattedDate || "Join Date",
    role: "Super Admin",
    phone: phone || "N/A",
    address: address || "N/A",
    // bio: "Senior Admin Manager with 5+ years of experience in e-commerce",
    // firstName: "John",

    // lastName: "Doe",
    // email: "john.doe@example.com",

    // location: "New York, USA",
    // bio: "Senior Admin Manager with 5+ years of experience in e-commerce",
    // joinDate: "January 2023",
  });

  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profile);
  };

  const handleSave = async () => {
    const { name, email, phone, address } = formData;
    try {
      const updatedUser = await dispatch(
        editUser({
          userId: SavedUser?._id || SavedUser?.id,
          userData: { name, email, phone, address },
        }),
      ).unwrap();
      setProfile((currentProfile) => ({
        ...currentProfile,
        ...updatedUser,
      }));
      setIsEditing(false);
    } catch {
      console.log("Failed to update user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Admin Profile
        </h1>
        <p className="text-footer/60">Manage your account information</p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-accent to-accent/70" />

        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Avatar and Name */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-8">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 bg-accent rounded-full border-4 border-primary flex items-center justify-center text-white text-3xl">
                <User className="w-12 h-12" />
              </div>
              <div className="mb-2">
                <h2 className="text-3xl font-heading font-bold text-footer">
                  {isEditing ? formData.name : profile.name}
                </h2>
                <p className="text-footer/60">{profile.role}</p>
              </div>
            </div>
            <div>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  {loading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-hero text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium border border-footer/10"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Info Sections */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-heading font-bold text-footer mb-6">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-footer/60">Email</p>
                      <p className="text-footer font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-footer/60">Phone</p>
                      <p className="text-footer font-medium">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-footer/60">Address</p>
                      <p className="text-footer font-medium">
                        {profile.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-heading font-bold text-footer mb-6">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-hero p-4 rounded-lg">
                    <p className="text-sm text-footer/60 mb-1">Join Date</p>
                    <p className="text-footer font-medium">
                      {profile.joinDate}
                    </p>
                  </div>
                  <div className="bg-hero p-4 rounded-lg">
                    <p className="text-sm text-footer/60 mb-1">Role</p>
                    <p className="text-footer font-medium">{profile.role}</p>
                  </div>
                  <div className="bg-hero p-4 rounded-lg">
                    <p className="text-sm text-footer/60 mb-1">Status</p>
                    <p className="text-footer font-medium text-green-600">
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-footer mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-footer mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-footer mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-footer mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-footer mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-footer mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div> */}

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 bg-hero text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium border border-footer/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-primary border border-footer/10 rounded-xl p-8">
        <h3 className="text-2xl font-heading font-bold text-footer mb-6">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-footer/10">
            <div>
              <p className="font-medium text-footer">Change Password</p>
              <p className="text-sm text-footer/60">
                Update your password regularly
              </p>
            </div>
            <button className="px-6 py-2 bg-hero text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium border border-footer/10">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-footer">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-footer/60">
                Add an extra layer of security
              </p>
            </div>
            <button className="px-6 py-2 bg-hero text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium border border-footer/10">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
