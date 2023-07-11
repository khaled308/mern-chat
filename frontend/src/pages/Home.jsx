import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { API_URL } from "../constants";
import { getUser } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import Contact from "../components/Contact";
import Chat from "../components/Chat";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user } = useSelector((state) => state.auth);
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/login");
    }
  }, [isError]);

  useEffect(() => {
    socket.current = io(API_URL, {
      auth: { token: localStorage.getItem("token") },
    });

    socket.current.on("connect_error", (error) => {
      if (error && error.message) {
        navigate("/login");
        console.log(error.message);
        console.log(error);
      }
    });

    socket.current.on("connectedUsers", (users) => {
      if (user) setContacts(users.filter((u) => u._id !== user._id));
    });

    socket.current.on("message", (message) => {
      if (message.from === selectedUserId) {
        setMessages((messages) => [...messages, message]);
      }
    });
    return () => {
      socket.current.disconnect();
    };
  }, [navigate, selectedUserId, user]);

  const sendMessage = (message) => {
    socket.current.emit("message", {
      to: selectedUserId,
      content: message,
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex">
      <Contact
        contacts={contacts}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <Chat
        selectedUserId={selectedUserId}
        sendMessage={sendMessage}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};
