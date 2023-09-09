import { useEffect, useState } from "react";
import { uploadImageToCloud } from "../../util/firebase";

function UploadFile({ memory, page, load, setMessage, clear }) {
  const [files, setFiles] = useState();

  useEffect(() => {
    setFiles(files);
  }, [files]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files);
    }
  };

  const upload = async (e) => {
    if (files) {
      // upload all files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (vaildateFile(file)) {
          await uploadImageToCloud(memory, page, files[i], load);
        } else {
          setMessage(
            "Error: Only the following file formats are accepted: {.jpg : .png : .jpeg }"
          );
        }
      }
      clear();
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

function vaildateFile(file) {
  const allowedExtensions = /(jpg|jpeg|png)/i;
  const extension = file.name.split(".").pop();
  return allowedExtensions.test(extension);
}

export default UploadFile;
