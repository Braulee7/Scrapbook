import menu from "../../assets/svg/menu.svg";
import "./index.css";
function PageTOCBtn({ clicked }) {
  return (
    <>
      <button className="table-of-content-btn" onClick={clicked}>
        <img src={menu} alt="table of contents" />
      </button>
    </>
  );
}

export default PageTOCBtn;
