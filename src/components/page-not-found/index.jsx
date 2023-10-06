import GoHome from "../go-home";
import "./index.css";

function PageNotFound() {
  return (
    <>
      <div className="page-not-found">
        <div className="contents">
          <h1 className="title">Page not found</h1>
          <br />
          <GoHome />
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
