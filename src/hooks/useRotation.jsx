import { useState, useEffect } from "react";
import { updateImageRotation, updateNotecardRotation } from "../util/firebase";

export default function useRotation(object, memory, page, isImage) {
  const [rotation, setRotation] = useState(object.rotation);

  useEffect(() => {
    const update = async () => {
      if (isImage) await updateImageRotation(memory, page, object, rotation);
      else await updateNotecardRotation(memory, page, object, rotation);
    };

    update();
  }, [object, memory, page, rotation, isImage]);

  return [rotation, setRotation];
}
