import "./app.css";
import { Route, Routes } from "react-router-dom";
import Main from "./main";
import Login from "./components/login";
import { useState } from "react";
function App() {
  const [login, setLogin]=useState(false)
  return (
    <>
      <Routes>
        {
          login ? <Route path='/' element={<Main />}></Route> : <Route path='/' element={<Login setLogin={setLogin } />}></Route>
        }
    </Routes>
    </>
    )

}

export default App
