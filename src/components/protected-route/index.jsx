import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "../../util/firebase";

function ProtectedRoute({ component }) {
  const [user] = useAuthState(getAuth());

  const navigate = useNavigate();

  const redirect = (e = null) => {
    e && e.preventDefault();
    navigate("/login");
  };

  if (!user) {
    // redirect to login
    redirect();
  } else {
    return component;
  }
}

export default ProtectedRoute;
