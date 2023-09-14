import { useNavigate } from "react-router-dom";
import "./index.css";

function MemoryCard({ title }) {
  const navigate = useNavigate();

  const redirect = (e) => {
    e.preventDefault();
    navigate(`/memory/${title}`);
  };

  return (
    <>
      <button onClick={redirect} className="card-container">
        <h1 className="title">{title}</h1>
      </button>
    </>
  );
}

export default MemoryCard;
