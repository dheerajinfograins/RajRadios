import React, { useState, useRef } from "react";
import { X, User, KeyRound, Camera, Upload, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../feactures/auth/authSlice";
import axiosInstance, { SERVER_URL } from "../../utils/axiosInstance";
const AdminProfileModal = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("info"); // info, password, photo

  // Info State
  const [infoData, setInfoData] = useState({
    user_name: user?.user_name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  
  // Password State
  const [pwdData, setPwdData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleInfoChange = (e) => setInfoData({ ...infoData, [e.target.name]: e.target.value });
  const handlePwdChange = (e) => setPwdData({ ...pwdData, [e.target.name]: e.target.value });

  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.patch("/users", infoData);
      dispatch(updateProfile(res.data.data));
      showMessage("Profile updated successfully");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      return showMessage("New passwords do not match", "error");
    }
    setLoading(true);
    try {
      await axiosInstance.put("/users/change-password", {
        oldPassword: pwdData.oldPassword,
        newPassword: pwdData.newPassword,
      });
      showMessage("Password changed successfully");
      setPwdData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to change password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("photo", file);
    
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateProfile(res.data.data));
      showMessage("Photo updated successfully");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to upload photo", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete("/users/photo");
      dispatch(updateProfile(res.data.data));
      showMessage("Photo removed successfully");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to remove photo", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors hidden md:flex items-center justify-center"
        >
          <X size={20} />
        </button>
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          </div>
          
          <button 
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'info' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <User size={18} /> Profile Details
          </button>
          <button 
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'password' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <KeyRound size={18} /> Change Password
          </button>
          <button 
            onClick={() => setActiveTab("photo")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'photo' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Camera size={18} /> Profile Photo
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col relative overflow-y-auto">

          {message && (
            <div className={`mb-6 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message.text}
            </div>
          )}

          {activeTab === "info" && (
            <form onSubmit={handleUpdateInfo} className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Details</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="user_name" name="user_name" value={infoData.user_name} onChange={handleInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={infoData.email} onChange={handleInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" required />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input type="text" id="mobile" name="mobile" value={infoData.mobile} onChange={handleInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 outline-none cursor-not-allowed" disabled />
                  <p className="text-xs text-gray-500 mt-1">Mobile number cannot be changed</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-70">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleChangePassword} className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" id="oldPassword" name="oldPassword" value={pwdData.oldPassword} onChange={handlePwdChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" required />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" id="newPassword" name="newPassword" value={pwdData.newPassword} onChange={handlePwdChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" required minLength="6" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={pwdData.confirmPassword} onChange={handlePwdChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" required minLength="6" />
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-70">
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "photo" && (
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Photo</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-sm overflow-hidden mb-6 bg-orange-50 flex items-center justify-center relative group">
                  {user?.photo ? (
                    <img src={user.photo?.startsWith('http') ? user.photo : `${SERVER_URL}${user.photo}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-orange-400">{user?.user_name?.charAt(0).toUpperCase()}</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>
                
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={handlePhotoUpload} 
                />

                <div className="flex gap-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <Upload size={18} /> {loading ? "Uploading..." : "Upload New"}
                  </button>
                  {user?.photo && (
                    <button 
                      onClick={handlePhotoDelete} 
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors"
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-6 text-center">Supported formats: JPG, PNG, WEBP.<br/>Max file size: 2MB.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminProfileModal;
