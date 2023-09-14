import { useState } from "react";
import "./index.css";
import Backdrop from "../backdrop";
function PageTOC({ memory, pages, goToPage }) {
  const toc = (
    <>
      <div className="table-of-contents">
        <h1>{memory}</h1>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              <button className="page-toc">{page.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  return <>{toc}</>;
}

export default PageTOC;
