import { useRef, useEffect } from "react";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    // Add your logic for sending the message
    console.log("Message sent");
  };

  return (
    <div className="w-3/4 bg-white flex flex-col">
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto">
        {/* Add your chat messages here */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div className="p-2 flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSendMessage}
        >
          <IoMdSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
