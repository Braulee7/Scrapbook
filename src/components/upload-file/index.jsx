import { useEffect, useState } from "react";
import { uploadImageToCloud } from "../../util/firebase";

function UploadFile({ memory, page }) {
  const [files, setFiles] = useState();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setFiles(files);
  }, [files]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files);
    }
  };

  const upload = (e) => {
    if (files) {
      // upload all files
      for (let i = 0; i < files.length; i++) {
        uploadImageToCloud(memory, page, files[i], setPercent);
      }
    }
  };

  return (
    <>
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleChange}
        />
        <button onClick={upload}>Upload</button>
      </div>
    </>
  );
}

export default UploadFile;
