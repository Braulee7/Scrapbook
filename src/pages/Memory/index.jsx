import NoteDescriptionComponent from "../../components/note-description-component";

function Memory() {
  return (
    <>
      <div>
        <NoteDescriptionComponent
          memory={"testing new memory"}
          page={"day_1"}
        />
      </div>
    </>
  );
}

export default Memory;
