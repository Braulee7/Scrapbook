import { getImages } from "../../util/firebase";
import Loading from "../loading";
import Image from "../image";
import UploadFile from "../upload-file";
import Backdrop from "../backdrop";
import ErrorMessage from "../error-message";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ImageContainer({ memory, page }) {
  const [image_urls, loading] = useCollectionData(getImages(memory, page));
  const [showAll, setShowAll] = useState(false);
  const [message, setMessage] = useState();

  const viewAll = (e) => {
    e.preventDefault();
    setShowAll(true);
  };

  const exitViewAll = (e = null) => {
    e && e.preventDefault();

    setShowAll(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="image-placeholder-container">
            <div className="image-container">
              {image_urls.length > 0 ? (
                image_urls.map((image, i) => <Image image={image} key={i} />)
              ) : (
                <p>No Images Inserted yet</p>
              )}
            </div>
          </div>
        </>
      )}
      {showAll && (
        <Backdrop callback={exitViewAll}>
          <UploadFile
            setMessage={setMessage}
            memory={memory}
            page={page}
            clear={exitViewAll}
          />
        </Backdrop>
      )}
      {message && (
        <AnimatePresence>
          <ErrorMessage message={message} setMessage={setMessage} />
        </AnimatePresence>
      )}
    </>
  );
}

export default ImageContainer;
