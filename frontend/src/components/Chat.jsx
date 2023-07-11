/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import useChatScroll from "../hooks/useChatScroll";
import { useSelector } from "react-redux";
import { getMessages } from "../features/messages/getMessages";
import { useNavigate } from "react-router-dom";

const Chat = ({ selectedUserId, messages, setMessages, sendMessage }) => {
  const [message, setMessage] = useState("");
  const ref = useChatScroll(messages);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    sendMessage(message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "me", content: message },
    ]);
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const historyMessages = await getMessages(selectedUserId);
        setMessages(historyMessages);
      } catch (error) {
        navigate("/login");
      }
    };

    if (selectedUserId) {
      fetchMessages();
    }
  }, [selectedUserId, navigate, setMessages]);
  return (
    <div className="w-3/4 bg-white flex flex-col p-2 h-screen">
      {/* Chat messages */}
      <div
        className="flex-grow overflow-y-auto max-h-full"
        style={{ height: "100%" }}
        ref={ref}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.from === "me" || message.from == String(user._id)
                ? "items-end"
                : "items-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-md mb-3 ${
                message.from === "me" || message.from == String(user._id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}
      {selectedUserId && (
        <div className="p-2 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
          >
            <IoMdSend size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
