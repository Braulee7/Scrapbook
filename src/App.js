import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import Memory from "./pages/Memory";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute component={<Home />} />} />
      <Route
        path="/memory/:memory"
        element={<ProtectedRoute component={<Memory />} />}
      />
    </Routes>
  );
}

export default App;
