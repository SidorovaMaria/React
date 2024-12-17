import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../components/user/firebase";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/authSlice";
import BackSection from "../components/design/BackSection";
import EditProfileField from "../components/user/EditProfileField";
const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [editableUser, setEditableUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    DOB: user?.DOB || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [id]: value, // Update the field that changed
    }));
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase (if using Firebase)
      dispatch(logoutUser());
      navigate("/");
      // Dispatch action to clear user from Redux state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditableUser((prevState) => ({
        ...prevState,
        profileImg: imageUrl,
      }));
    }
  };

  return (
    <BackSection>
      <div className="flex flex-col justify-center items-center m-16">
        <header className="m-5 flex flex-col items-center gap-8">
          <h2 className="font-AS text-3xl tracking-wider">
            Welcome, {user.username}!
          </h2>
          <div className="relative w-32 h-32">
            <img
              src={editableUser.profileImg || "https://via.placeholder.com/128"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <label htmlFor="setProfile" title="Change Profile Image">
              <FontAwesomeIcon
                icon={faEdit}
                className="text-2xl absolute top-0 -right-2 bg-main p-2 rounded-full border-2 border-white
              hover:bg-accent"
              />
            </label>
            <input
              type="file"
              id="setProfile"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <h4 className="font-mitr font-semibold tracking-widest text-white/50 capitalize">
            Joined on {user.CreatedAt}
          </h4>
        </header>
        <div className="w-full max-w-md">
          {/* Profile Details */}

          <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
            <EditProfileField
              fieldName="username"
              value={editableUser.username}
              onChange={handleChange}
              label="Username"
            />
            <EditProfileField
              fieldName="email"
              value={editableUser.email}
              onChange={handleChange}
              label="Email"
            />
            <EditProfileField
              fieldName="DOB"
              value={editableUser.DOB}
              onChange={handleChange}
              label="Date of Birth"
            />
          </div>
        </div>
        <button
          title="Log Out"
          onClick={() => {
            handleLogout();
            setOpenNavigation(false);
          }}
          className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg my-12 hover:bg-white hover:font-AS-3D-Bold hover:text-main"
        >
          Log Out
        </button>
      </div>
    </BackSection>
  );
};

export default ProfilePage;
