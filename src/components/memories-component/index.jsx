import { useCollectionData } from "react-firebase-hooks/firestore";
import { getMemories } from "../../util/firebase";
import { useEffect, useState } from "react";
import MemoryCard from "../memory-card";
import Loading from "../loading";
import NavigationButton from "../navigation-button";
import CarouselSelector from "../carousell-selector";

import "./index.css";
import AddMemory from "../add-memory";

function MemoriesComponent({ uid, page }) {
  // get the full list
  const [memories, loading] = useCollectionData(getMemories(uid), {
    idField: "id",
  });
  const [currPageNumber, setCurrPageNumber] = useState(page);
  const itemsPerPage = 1;
  const [currMemories, setCurrMemories] = useState();

  useEffect(() => {
    if (memories) {
      setCurrMemories(getMemoriesFromPage(memories, currPageNumber, 1));
    }
  }, [currPageNumber, memories]);

  if (loading) {
    return <Loading />;
  }

  const numberOfPages = memories.length / itemsPerPage;

  const goNext = (e) => {
    e.preventDefault();

    if (currPageNumber + 1 < numberOfPages) {
      setCurrPageNumber(currPageNumber + 1);
    }
  };

  const goPrev = (e) => {
    e.preventDefault();

    if (currPageNumber - 1 >= 0) {
      setCurrPageNumber(currPageNumber - 1);
    }
  };

  return (
    <>
      <div className="memory-component">
        <div className="memories-container">
          <NavigationButton orientation={0} handleClick={goPrev} />
          <div className="memory-list">
            {currMemories != null ? (
              currMemories.map((memory) => (
                <MemoryCard key={memory.idField} title={memory.Name} />
              ))
            ) : (
              <h1 className="no-memories">No memories, click below to add</h1>
            )}
          </div>
          <NavigationButton orientation={1} handleClick={goNext} />
        </div>
        <CarouselSelector
          pageNumber={currPageNumber}
          numberOfPages={numberOfPages}
        />
        <AddMemory />
      </div>
    </>
  );
}

function getMemoriesFromPage(memories, page, itemsPerPage) {
  // check if there are memories
  if (memories.length < 1) {
    return null;
  }

  let start = page * itemsPerPage;
  let end = start + itemsPerPage;

  return memories.slice(start, end);
}

export default MemoriesComponent;
