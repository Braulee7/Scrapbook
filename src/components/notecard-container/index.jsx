import "./index.css";
import { getNotecards } from "../../util/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../loading";
import Notecard from "../notecard";

function NotecardContainer({ memory, page }) {
  const [notecards, loading] = useCollectionData(getNotecards(memory, page));

  while (loading) {
    return <Loading />;
  }

  return (
    <div className="notecard-component">
      {notecards.map((note, i) => (
        <Notecard notecard={note} memory={memory} page={page} key={i} />
      ))}
    </div>
  );
}

export default NotecardContainer;
