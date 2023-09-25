import AddPage from "../add-page";
import GoHome from "../go-home";
import "./index.css";
function NoPage({ memory }) {
  return (
    <div className="no-page">
      <h1 className="title">
        No pages in this memory yet, click below to add one
      </h1>
      <AddPage memory={memory} close={() => {}} />
      <br />
      <h1 className="title">Or</h1>
      <br />
      <GoHome />
    </div>
  );
}

export default NoPage;
