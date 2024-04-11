import { useState, useEffect } from "react";
import { updateImageScale, updateNotecardScale } from "../util/firebase";

export default function useScale(object, memory, page, isImage) {
  const [scale, setScale] = useState(object.scale);

  useEffect(() => {
    const update = async () => {
      if (isImage) await updateImageScale(memory, page, object, scale);
      else await updateNotecardScale(memory, page, object, scale);
    };

    update();
  }, [object, memory, page, scale, isImage]);

  return [scale, setScale];
}
