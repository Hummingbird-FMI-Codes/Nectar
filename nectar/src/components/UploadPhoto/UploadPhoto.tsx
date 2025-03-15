import { memo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";
import "./UploadPhoto.css"; // Import the CSS file

export const UploadPhoto = memo(() => {
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      const allFiles = [...files, ...acceptedFiles];
      setFiles(allFiles);
      setPreview(acceptedFiles.map(URL.createObjectURL));
    },
  } as unknown as DropzoneOptions);

  // Handle JSON file upload
  const handleJSONUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const jsonFile = event.target.files?.[0];
    if (!jsonFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setMetadata(jsonData);
      } catch (error) {
        alert("Invalid JSON format");
      }
    };
    reader.readAsText(jsonFile);
  };

  // Handle form submission (send JSON + Image)
  const handleUpload = async () => {
    if (!files || !metadata)
      return alert("Please upload both an image and JSON metadata.");

    const formData = new FormData();
    formData.append("file", files);
    formData.append("metadata", JSON.stringify(metadata)); // Convert JSON to a string

    setUploading(true);

    try {
      const response = await axios.post(
        "https://your-api.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Upload Successful! File URL: " + response.data.url);
    } catch (error) {
      alert("Upload failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload Photo</h3>
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

      <input
        type="file"
        accept="application/json"
        onChange={handleJSONUpload}
        className="json-upload"
      />
      {metadata && (
        <div className="metadata-preview">
          <h3>Metadata Preview:</h3>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!files || !metadata || uploading}
        className="upload-button"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
});
