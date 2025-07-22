import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore.js';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchUser, getUsers, isUsersLoading } = useChatStore();
  const debounceTimeout = useRef(null);

  const clearSearch = async () => {
    setSearchTerm('');
    // Clear any pending debounced search
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Reset to show all users when clearing search
    await getUsers();
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUser(searchTerm.trim());
    } else {
      await getUsers();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout for debounced search
    debounceTimeout.current = setTimeout(async () => {
      if (value.trim()) {
        await searchUser(value.trim());
      } else {
        // Show all users when input is empty
        await getUsers();
      }
    }, 500); // 500ms delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Clear debounce and search immediately on Enter
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      handleSearch();
    }
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="mt-3 hidden lg:flex items-center gap-2">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-3 w-3 opacity-50 pointer-events-none z-10" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search users..."
          disabled={isUsersLoading}
          className={`input input-sm input-bordered w-full pl-7 pr-8 ${
            isUsersLoading ? 'loading' : ''
          }`}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            disabled={isUsersLoading}
            className="absolute right-2 p-0.5 opacity-50 hover:opacity-70 
                       transition-opacity duration-200 z-10 btn btn-ghost btn-xs btn-circle"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;