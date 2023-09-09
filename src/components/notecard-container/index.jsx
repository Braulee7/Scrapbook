import "./index.css";
import { getNotecards } from "../../util/firebase";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
import Loading from "../loading";
import NoteCardSection from "../notecard-section";
import CarouselSelector from "../carousell-selector";

function NotecardContainer({ memory, page }) {
  const [notecards, loading] = useCollectionData(getNotecards(memory, page), {
    idField: "id",
  });
  const [notecardSections, setNotecardSections] = useState();
  const [itemsPerSection, setItemsPerSection] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const swipeConfidenceThreshold = 1000;

  useEffect(() => {
    // recalculate current notecards
    if (notecards) {
      setNotecardSections(getListOfNotecards(notecards, itemsPerSection));
    }
  }, [notecards, itemsPerSection]);

  useEffect(() => {
    if (notecardSections) setNumberOfPages(notecardSections.length);
  }, [notecardSections]);

  const handleSwipe = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const goNext = (e) => {
    if (currPage < numberOfPages - 1) {
      setCurrPage(currPage + 1);
      setDirection(1);
    } else {
      setCurrPage(0);
      setDirection(1);
    }
  };

  const goPrev = (e) => {
    if (currPage > 0) {
      setCurrPage(currPage - 1);
      setDirection(-1);
    } else {
      setCurrPage(numberOfPages - 1);
      setDirection(-1);
    }
  };

  while (loading) {
    return <Loading />;
  }

  return (
    <div className="notecard-component">
      <div className="notecard-list-container">
        <motion.div
          key={currPage}
          custom={direction}
          variants={variants}
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
            const swipe = handleSwipe(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) goNext(e);
            else if (swipe > swipeConfidenceThreshold) goPrev(e);
          }}
        >
          {notecardSections && notecardSections[currPage]}
        </motion.div>
      </div>
      <CarouselSelector numberOfPages={numberOfPages} pageNumber={currPage} />
    </div>
  );
}

function getListOfNotecards(notecards, itemsPerSection) {
  var start = 0;
  var length = notecards.length;
  const list = [];

  while (start < length) {
    let curr = notecards.slice(start, start + itemsPerSection);
    list.push(<NoteCardSection notecards={curr} />);
    start += itemsPerSection;
  }

  return list;
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
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default NotecardContainer;