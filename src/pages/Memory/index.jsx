import ImageContainer from "../../components/image-container";
import NoteDescriptionComponent from "../../components/note-description-component";
import UploadFile from "../../components/upload-file";

function Memory() {
  return (
    <>
      <div>
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
