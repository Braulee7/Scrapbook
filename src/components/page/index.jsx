import AddItem from "../add-item";
import ImageContainer from "../image-container";
import NoteDescriptionComponent from "../note-description-component";
import "./index.css";

function Page({ memory, page }) {
  return (
    <>
      <div className="page-container">
        <ImageContainer key={page} memory={memory} page={page} />
        <NoteDescriptionComponent memory={memory} page={page} />
      </div>
      <AddItem memory={memory} page={page} />
    </>
  );
}

export default Page;
