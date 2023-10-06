import Login from "./pages/Login";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import PageNotFound from "./components/page-not-found";
import "./index.css";
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
