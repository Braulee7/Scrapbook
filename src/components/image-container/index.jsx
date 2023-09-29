import { getImages } from "../../util/firebase";
import Loading from "../loading";
import Image from "../image";
import { useCallback, useEffect, useState } from "react";
import ImageCarousel from "../image-carousel";
import UploadFile from "../upload-file";
import Backdrop from "../backdrop";
import ErrorMessage from "../error-message";
import "./index.css";
import { AnimatePresence } from "framer-motion";

function ImageContainer({ memory, page }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [message, setMessage] = useState();

  const loadImages = async () => {
    // set loading screen
    setLoading(true);
    // wait for images
    const response = await getImages(memory, page);
    // set the images and turn off loading
    setImages(response);
    setLoading(false);
  };
  const load = useCallback(loadImages, [memory, page]);

  useEffect(() => {
    load();
  }, [load]);

  // get the top three favourite images
  useEffect(() => {
    var newFav = [];
    for (let i = 0; i < 3 && i < images.length; i++) {
      const image = (
        <Image className={`favourite-${i}`} url={images[i]} key={i} />
      );
      newFav.push(image);
    }

    setFavourites(newFav);
  }, [images]);

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
          <div className="image-container">
            {images.length > 0 ? (
              favourites.map((element) => element)
            ) : (
              <h1>No Images click view all to add some</h1>
            )}

            <button className="view-all-btn" onClick={viewAll}>
              View all
            </button>
          </div>
        </>
      )}
      {showAll && (
        <Backdrop callback={exitViewAll}>
          <ImageCarousel images={images} />
          <UploadFile
            setMessage={setMessage}
            memory={memory}
            page={page}
            load={loadImages}
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
