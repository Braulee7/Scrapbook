import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Memory from "./pages/Memory";
import { Route, Routes } from "react-router-dom";

function App() {
  const [user] = useAuthState(getAuth());
  // return <>{user ? <Memory /> : <Login />}</>;
  //  <>{user ? <Home /> : <Login />}</>
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {user && <Route path="/" element={<Home />} />}
      {user && <Route path="/memory/:memory" element={<Memory />} />}
    </Routes>
  );
}

export default App;
