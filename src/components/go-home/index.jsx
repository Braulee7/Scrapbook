import { useNavigate } from "react-router-dom";
import "./index.css";
function GoHome() {
  const navigate = useNavigate();

  const redirect = (e = null) => {
    e && e.preventDefault();
    navigate(`/`);
  };

  return (
    <button className="go-home" onClick={redirect}>
      Go Home
    </button>
  );
}

export default GoHome;
