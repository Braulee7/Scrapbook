import { getImages } from "../../util/firebase";
import Loading from "../loading";
import Image from "../image";
import { useEffect, useState } from "react";
import ImageCarousel from "../image-carousel";
import UploadFile from "../upload-file";

function ImageContainer({ memory, page }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      // set loading screen
      setLoading(true);

      // wait for images
      const response = await getImages(memory, page);
      // set the images and turn off loading
      setImages(response);
      setLoading(false);
    };
    loadImages();
  }, [memory, page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="image-container">
          <ImageCarousel images={images} />
        </div>
      )}
      <UploadFile memory={memory} page={page} />
    </>
  );
}

export default ImageContainer;
