import axios from "axios";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    axios.get("/").then((res) => console.log(res.data));
  }, []);
  return <div className="bg-slate-300">Home</div>;
};
