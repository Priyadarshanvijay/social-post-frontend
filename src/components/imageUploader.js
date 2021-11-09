import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";

const CloudinaryUploadWidget = ({ setImageURL }) => {

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "da0m5civo",
        uploadPreset: "t0yuqccq",
        sources: ['local', 'camera', 'url', 'google_drive']
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <Button fluid id="upload_widget" className="cloudinary-button">
      Add Image
    </Button>
  );
}

export default CloudinaryUploadWidget;
