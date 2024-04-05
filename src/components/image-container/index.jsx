import { getImages } from "../../util/firebase";
import Loading from "../loading";
import Image from "../image";
import AddItem from "../add-item";
import { useRef } from "react";
import "./index.css";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ImageContainer({ memory, page }) {
  const [image_urls, loading] = useCollectionData(getImages(memory, page));
  const ref = useRef(null);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="image-placeholder-container">
            <div ref={ref} className="image-container">
              {image_urls.length > 0 ? (
                image_urls.map((image, i) => (
                  <Image image={image} memory={memory} page={page} key={i} />
                ))
              ) : (
                <p>No Images Inserted yet</p>
              )}
              <AddItem memory={memory} page={page} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ImageContainer;
