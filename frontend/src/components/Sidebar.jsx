import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import SearchBar from "./SearchBar";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    unreadCounts,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Subscribe to messages when component mounts
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  // Sort users to show those with unread messages first
  const sortedUsers = [...users].sort((a, b) => {
    const aHasUnread = unreadCounts[a._id] > 0;
    const bHasUnread = unreadCounts[b._id] > 0;
    
    // If both have unread or both don't have unread, maintain original order
    if (aHasUnread === bHasUnread) return 0;
    
    // Users with unread messages come first
    return bHasUnread ? 1 : -1;
  });

  const filteredUsers = showOnlineOnly
    ? sortedUsers.filter((user) => onlineUsers.includes(user._id))
    : sortedUsers;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="border-r border-base-300 w-1/4 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Users className="size-6" />
        <span className="font-medium">Contacts</span>
      </div>

      <SearchBar />

      <div className="py-3">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          Show online only
        </label>
        <span className="text-xs text-zinc-500 ml-6">
          ({onlineUsers.length - 1} online)
        </span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors rounded px-1 ${
              selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
              {/* UNREAD COUNT BADGE - Always show if count > 0 */}
              {unreadCounts[user._id] > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  {unreadCounts[user._id]}
                </span>
              )}
            </div>

            <div className="text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;