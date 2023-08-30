import AddMemoryForm from "../add-memory-form";
import Backdrop from "../backdrop";

function AddMemory({ close }) {
  return (
    <>
      <Backdrop callback={close}>
        <AddMemoryForm close={close} />
      </Backdrop>
    </>
  );
}

export default AddMemory;
