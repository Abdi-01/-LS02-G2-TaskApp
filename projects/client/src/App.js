import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import "./App.css";
import { useEffect, useState } from "react";
import Login from '../src/pages/Login';
import Register from '../src/pages/Register'
import Home from '../src/pages/Home'

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
