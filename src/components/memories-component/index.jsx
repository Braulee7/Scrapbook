import { useCollectionData } from "react-firebase-hooks/firestore";
import { getMemories } from "../../util/firebase";
import { useEffect, useState } from "react";
import MemoryCard from "../memory-card";
import Loading from "../loading";
import NavigationButton from "../navigation-button";
import CarouselSelector from "../carousell-selector";

import "./index.css";
import AddMemoryButton from "../add-memory-button";
import { motion, AnimatePresence } from "framer-motion";

function MemoriesComponent({ uid, page }) {
  // get the full list
  const [memories, loading] = useCollectionData(getMemories(uid), {
    idField: "id",
  });
  const [currPageNumber, setCurrPageNumber] = useState(page);
  const [currMemories, setCurrMemories] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [screenSize, setScreenSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [direction, setDirection] = useState(0);
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };
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
  });

  useEffect(() => {
    const items = screenSize.x > 875 && screenSize.x > 885 ? 4 : 1;
    if (memories && Math.ceil(memories.length / items) < currPageNumber) {
      setCurrPageNumber(0);
    }
    setItemsPerPage(items);
  }, [screenSize, memories, currPageNumber]);

  if (loading) {
    return <Loading />;
  }

  const numberOfPages = Math.ceil(memories.length / itemsPerPage);

  const goNext = (e) => {
    e.preventDefault();

    if (currPageNumber + 1 < numberOfPages) {
      setCurrPageNumber(currPageNumber + 1);
      setDirection(1);
    }
  };

  const goPrev = (e) => {
    e.preventDefault();

    if (currPageNumber - 1 >= 0) {
      setCurrPageNumber(currPageNumber - 1);
      setDirection(-1);
    }
  };

  return (
    <>
      <div className="memory-component">
        <div className="memories-container">
          <NavigationButton orientation={0} handleClick={goPrev} />
          <AnimatePresence>
            <motion.div
              className="memory-list"
              variants={variants}
              custom={direction}
              initial="enter"
              exit="exit"
              animate="center"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) goNext(e);
                else if (swipe > swipeConfidenceThreshold) goPrev(e);
              }}
            >
              {currMemories != null ? (
                currMemories.map((memory) => (
                  <MemoryCard key={memory.Name} title={memory.Name} />
                ))
              ) : (
                <h1 className="no-memories">No memories, click below to add</h1>
              )}
            </motion.div>
          </AnimatePresence>
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
  return newMemories;
}

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default MemoriesComponent;
