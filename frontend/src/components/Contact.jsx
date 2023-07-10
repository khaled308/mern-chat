/* eslint-disable react/prop-types */

import { useState } from "react";

const Contact = ({ contacts }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleContactClick = (contactId) => {
    if (contactId === selectedUser) {
      setSelectedUser(null);
    } else {
      setSelectedUser(contactId);
    }
    console.log(`Clicked contact with ID: ${contactId}`);
  };

  return (
    <div className="w-1/4 bg-blue-200 flex flex-col h-screen p-2">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`flex flex-row gap-2 items-center p-2 cursor-pointer transition duration-300 ${
            contact._id === selectedUser
              ? "bg-blue-300"
              : "bg-blue-200 hover:bg-blue-300"
          }`}
          onClick={() => handleContactClick(contact._id)}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              contact.isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
          <span>{contact.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Contact;
