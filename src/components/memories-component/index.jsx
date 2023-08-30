import { useCollectionData } from "react-firebase-hooks/firestore";
import { getMemories } from "../../util/firebase";
import { useEffect, useState } from "react";
import MemoryCard from "../memory-card";
import Loading from "../loading";
import NavigationButton from "../navigation-button";
import CarouselSelector from "../carousell-selector";

import "./index.css";
import AddMemoryButton from "../add-memory-button";

function MemoriesComponent({ uid, page }) {
  // get the full list
  const [memories, loading] = useCollectionData(getMemories(uid), {
    idField: "id",
  });
  const [currPageNumber, setCurrPageNumber] = useState(page);
  const [currMemories, setCurrMemories] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [screenSize, setScreenSize] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (memories) {
      setCurrMemories(
        getMemoriesFromPage(memories, currPageNumber, itemsPerPage)
      );
    }
  }, [currPageNumber, memories, itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const items = screenSize.x > 775 ? 4 : 1;
    setItemsPerPage(items);
  }, [screenSize]);

  if (loading) {
    return <Loading />;
  }

  const numberOfPages = Math.ceil(memories.length / itemsPerPage);

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
                <MemoryCard key={memory.Name} title={memory.Name} />
              ))
            ) : (
              <h1 className="no-memories">No memories, click below to add</h1>
            )}
          </div>
          <NavigationButton orientation={1} handleClick={goNext} />
        </div>
        <div className="other-items">
          <CarouselSelector
            pageNumber={currPageNumber}
            numberOfPages={numberOfPages}
          />
          <AddMemoryButton />
        </div>
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
  let newMemories = memories.slice(start, end);
  console.log(newMemories);
  return newMemories;
}

export default MemoriesComponent;
