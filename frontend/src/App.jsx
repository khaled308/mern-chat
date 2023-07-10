import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Home } from "./pages/Home";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/api/v1/";
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
