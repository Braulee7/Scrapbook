import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Memory from "./pages/Memory";

function App() {
  const [user] = useAuthState(getAuth());
  return <Memory />;
  return <>{user ? <Home /> : <Login />}</>;
}

export default App;
