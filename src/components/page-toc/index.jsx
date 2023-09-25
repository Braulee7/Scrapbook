import "./index.css";
import { useState } from "react";
import AddPage from "../add-page";
import Backdrop from "../backdrop";
import GoHome from "../go-home";
function PageTOC({ memory, pages, goToPage }) {
  const [adding, setAdding] = useState(false);
  const toggleAddOn = (e) => {
    e.preventDefault();
    setAdding(true);
  };

  const toggleAddOff = (e = null) => {
    e && e.preventDefault();
    setAdding(false);
  };

  return (
    <>
      {adding && (
        <Backdrop callback={toggleAddOff}>
          <AddPage memory={memory} close={toggleAddOff} />
        </Backdrop>
      )}
      <div className="table-of-contents">
        <h1>{memory}</h1>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(index);
                }}
                className="page-toc"
              >
                {page.name}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={toggleAddOn} className="toggle-add">
          Add new page
        </button>
        <GoHome />
      </div>
    </>
  );
}

export default PageTOC;
