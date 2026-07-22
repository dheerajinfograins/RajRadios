import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useSocket } from "../../hooks/useSocket";
import axiosInstance from "../../utils/axiosInstance";

const NotificationBell = ({ colorClass = "text-gray-600 hover:text-gray-900" }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Use 'admin' if admin user, else use their user id for fetching/socket
  const recipient = user?.role === "admin" ? "admin" : user?._id;
  const socket = useSocket(token);

  useEffect(() => {
    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        if (!recipient) return;
        const res = await axiosInstance.get(`/notifications/${recipient}`);
        if (res.data.success) {
          setNotifications(res.data.data);
          setUnreadCount(res.data.unreadCount);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, [recipient]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    // Listen to respective events
    if (user?.role === "admin") {
      socket.on("admin_notification", handleNewNotification);
    } else {
      socket.on("user_notification", handleNewNotification);
    }

    return () => {
      socket.off("admin_notification", handleNewNotification);
      socket.off("user_notification", handleNewNotification);
    };
  }, [socket, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put(`/notifications/${recipient}/read-all`);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 focus:outline-none transition-colors ${colorClass}`}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50 overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <span className="font-semibold text-gray-700">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification._id}
                  type="button"
                  onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                  className={`w-full text-left block px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {notification.message}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
