import "./index.css";
import { useState } from "react";
import { SignOutUser } from "../../util/firebase";
import AddPage from "../add-page";
import Backdrop from "../backdrop";
import GoHome from "../go-home";
import ConfirmMessage from "../confirm-message";
import Delete from "../delete";

function PageTOC({ memory, pages, goToPage }) {
  const [adding, setAdding] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toggleAddOn = (e) => {
    e.preventDefault();
    setAdding(true);
  };

  const toggleAddOff = (e = null) => {
    e && e.preventDefault();
    setAdding(false);
  };

  const handleClick = () => {
    setConfirm(true);
  };

  const close = () => {
    setConfirm(false);
  };

  return (
    <>
      {adding && (
        <Backdrop callback={toggleAddOff}>
          <AddPage memory={memory} close={toggleAddOff} />
        </Backdrop>
      )}
      {confirm && (
        <ConfirmMessage
          message={"Sign out"}
          confirmCallback={SignOutUser}
          closeCallback={close}
        />
      )}
      <div className="table-of-contents">
        <h1>{memory}</h1>
        <ul>
          {pages.map((page, index) => (
            <li className="pages-list" key={index}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(index);
                }}
                className="page-toc"
              >
                {page.name}
              </button>
              <Delete type="page" options={{ memory, page: page.name }} />
            </li>
          ))}
        </ul>
        <button onClick={toggleAddOn} className="toggle-add">
          Add new page
        </button>
        <div className="navigation-buttons">
          <GoHome />
          <button onClick={handleClick} className="sign-out">
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

export default PageTOC;
