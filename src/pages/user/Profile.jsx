import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from "../../feactures/auth/authSlice";
import axiosInstance, { SERVER_URL } from "../../utils/axiosInstance";
import { Camera, Upload, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    user_name: user?.user_name || user?.name || '',
    email: user?.email || '',
  });

  const [pwdData, setPwdData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePwdChange = (e) => {
    setPwdData({ ...pwdData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Update Profile Info
      const res = await axiosInstance.patch("/users", formData);
      dispatch(updateProfile(res.data.data));

      // 2. Change Password if provided
      if (pwdData.newPassword) {
        if (!pwdData.oldPassword) {
          throw new Error("Current password is required to set a new password.");
        }
        await axiosInstance.put("/users/change-password", {
          oldPassword: pwdData.oldPassword,
          newPassword: pwdData.newPassword,
        });
        setPwdData({ oldPassword: '', newPassword: '' });
      }

      showMessage("Profile updated successfully!");
    } catch (error) {
      showMessage(error.response?.data?.message || error.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const data = new FormData();
    data.append("photo", file);
    
    setPhotoLoading(true);
    try {
      const res = await axiosInstance.post("/users/photo", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateProfile(res.data.data));
      showMessage("Photo updated successfully!");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to upload photo", "error");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handlePhotoDelete = async () => {
    if (!window.confirm("Remove profile photo?")) return;
    setPhotoLoading(true);
    try {
      const res = await axiosInstance.delete("/users/photo");
      dispatch(updateProfile(res.data.data));
      showMessage("Photo removed successfully!");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to remove photo", "error");
    } finally {
      setPhotoLoading(false);
    }
  };

  let profileImageContent;
  if (photoLoading) {
    profileImageContent = <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />;
  } else if (user?.photo) {
    profileImageContent = <img src={user.photo?.startsWith('http') ? user.photo : `${SERVER_URL}${user.photo}`} alt="Profile" className="w-full h-full object-cover" />;
  } else {
    profileImageContent = <span className="text-4xl font-bold text-cyan-400">{user?.user_name?.charAt(0).toUpperCase() || 'U'}</span>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 pb-16 px-4 bg-[#0a0f16] text-white relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>
      
      <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">My Profile</h2>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm text-center font-medium ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
            {message.text}
          </div>
        )}

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-lg overflow-hidden mb-4 bg-gray-900 flex items-center justify-center relative group">
            {profileImageContent}
            
            <button 
              type="button"
              onClick={() => !photoLoading && fileInputRef.current?.click()}
              className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer border-none outline-none"
              aria-label="Upload profile photo"
            >
              <Camera className="text-white w-8 h-8" />
            </button>
          </div>
          
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            ref={fileInputRef}
            className="hidden" 
            onChange={handlePhotoUpload} 
          />

          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()} 
              disabled={photoLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg font-medium transition-colors"
            >
              <Upload size={16} /> Upload New
            </button>
            {user?.photo && (
              <button 
                type="button"
                onClick={handlePhotoDelete} 
                disabled={photoLoading}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm rounded-lg font-medium transition-colors border border-red-500/20"
              >
                <Trash2 size={16} /> Remove
              </button>
            )}
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* User Name */}
          <div>
            <label htmlFor="user_name" className="block mb-2 text-sm text-gray-300 font-medium">Full Name</label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300 font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile (Read-Only) */}
          <div>
            <label htmlFor="mobile" className="block mb-2 text-sm text-gray-300 font-medium">Mobile Number <span className="text-xs text-gray-500 font-normal ml-2">(Cannot be changed)</span></label>
            <input
              id="mobile"
              type="tel"
              value={user?.mobile || ''}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* Passwords */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-medium text-cyan-400 mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block mb-2 text-sm text-gray-300 font-medium">Current Password</label>
                <div className="relative">
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={pwdData.oldPassword}
                    onChange={handlePwdChange}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition pr-10"
                    placeholder="Required if changing password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm text-gray-300 font-medium">New Password</label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={pwdData.newPassword}
                    onChange={handlePwdChange}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition pr-10"
                    placeholder="Enter new password (optional)"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 disabled:text-gray-400 p-3 rounded-lg text-black font-bold text-lg transition duration-300 shadow-lg mt-6 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
