import { useState, useEffect } from "react";

const PreviewPost = ({ mediaProp, title, }) => {
  const [media, setMedia] = useState({ url: "", type: "" });

  useEffect(() => {
    // When mediaProp changes, update the state
    setMedia(mediaProp);
  }, [mediaProp]);

  const renderPreview = () => {
    if (media.type && media.url) {
      if (media.type.startsWith("image/")) {
        return (
          <img
            src={media.url}
            alt="Image Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        );
      } else if (media.type.startsWith("video/")) {
        return (
          <video
            controls width="100%" height="200">
              <source src={media.url} />
            </video>
          
        );
      } else if (media.type.startsWith("audio/")) {
        return <audio controls src={media.url} />;
      } else {
        return <p>Unsupported media type</p>;
      }
    } else {
      return <p>No media preview available</p>;
    }
  };

  return <div style={{ width: "100%" }}>
    <h1>{title}</h1>
    {renderPreview()}
    </div>;
};

export default PreviewPost;
