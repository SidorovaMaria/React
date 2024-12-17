import { faEdit, faSave } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EditProfileField = ({ fieldName, value, onChange, label }) => {
  const [isEditable, setIsEditable] = useState(false);

  // Toggle edit state
  const toggleEdit = () => setIsEditable((prev) => !prev);
  return (
    <div className="flex flex-col">
      <label htmlFor={fieldName} className="font-AS text-lg mb-1">
        {label}
      </label>
      <div className="flex max-w-xl">
        <input
          id={fieldName}
          value={value}
          onChange={onChange}
          readOnly={!isEditable} // Toggle between read-only and editable
          className={`flex-1 p-2 rounded-l-xl border text-main outline-accent font-medium font-mitr ${
            isEditable
              ? "bg-accent text-white text-center cursor-text"
              : "cursor-pointer"
          }`}
        />
        {isEditable ? (
          <FontAwesomeIcon
            icon={faSave}
            className="text-2xl rounded-r-xl bg-main p-2 px-3 border-2 border-white hover:bg-accent cursor-pointer"
            onClick={toggleEdit} // Toggle editable state when clicked
          />
        ) : (
          <FontAwesomeIcon
            icon={faEdit}
            className="text-2xl rounded-r-xl bg-main p-2 px-3 border-2 border-white hover:bg-accent cursor-pointer"
            onClick={toggleEdit} // Toggle editable state when clicked
          />
        )}
        {/* */}
      </div>
    </div>
  );
};

export default EditProfileField;
