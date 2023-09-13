import ImageContainer from "../../components/image-container";
import NoteDescriptionComponent from "../../components/note-description-component";
import "./index.css";

function Memory() {
  return (
    <>
      <div className="page-container">
        <ImageContainer memory={"testing new memory"} page={"day_1"} />
        <NoteDescriptionComponent
          memory={"testing new memory"}
          page={"day_1"}
        />
      </div>
    </>
  );
}

export default Memory;
