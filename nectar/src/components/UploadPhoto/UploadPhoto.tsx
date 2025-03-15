import { memo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";
import "./UploadPhoto.css"; // Import the CSS file

export const UploadPhoto = memo(() => {
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      const allFiles = [...files, ...acceptedFiles];
      setFiles(allFiles);
      setPreview(acceptedFiles.map(URL.createObjectURL));
    },
  } as unknown as DropzoneOptions);

  const handleUpload = async () => {
    if (!files) return alert("No file selected!");

    // TODO FIXME: Replace this with your API endpoint
    const formData = new FormData();
    formData.append("file", files);

    setUploading(true);

    try {
      const response = await axios.post(
        "https://your-api.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // TODO Remove
      alert("Upload Successful! File URL: " + response.data.url);
    } catch (error) {
      // TODO Remove
      alert("Upload failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...(getInputProps() as any)} />
        {preview.length ? (
          <>
            <div style={{ flexDirection: "row" }} className="preview-images">
              {preview.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Preview"
                  className="preview-image"
                />
              ))}
            </div>
            {preview.length > 4 && <p>{`+${preview.length - 4} more`}</p>}
          </>
        ) : (
          <p>Drag & drop an image or click to select</p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!files || uploading}
        className="upload-button"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
});
