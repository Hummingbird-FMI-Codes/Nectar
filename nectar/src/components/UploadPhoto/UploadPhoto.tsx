import { memo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import "./UploadPhoto.css";
import { ImageWithoutData } from "../../types/ImageUpload";

export const UploadPhoto = memo(
  (props: {
    data: ImageWithoutData[];
    setData: (data: ImageWithoutData[]) => void;
  }) => {
    const [uploading, setUploading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
      accept: { "application/json": [] },
      onDrop: (acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const images = JSON.parse(
              event.target?.result as string
            ) as ImageWithoutData[];

            props.setData(images);
          } catch (error) {
            alert("Invalid JSON format.");
          }
        };

        reader.readAsText(uploadedFile);
      },
    } as unknown as DropzoneOptions);

    const handleUpload = async () => {
      // TODO
      // if (!files || !uploadedData)
      //   return alert("Please upload both an image and JSON metadata.");
      // const formData = new FormData();
      // formData.append("file", files);
      // formData.append("metadata", JSON.stringify(uploadedData)); // Convert JSON to a string
      // setUploading(true);
      // try {
      //   const response = await axios.post(
      //     "https://your-api.com/upload",
      //     formData,
      //     {
      //       headers: { "Content-Type": "multipart/form-data" },
      //     }
      //   );
      //   alert("Upload Successful! File URL: " + response.data.url);
      // } catch (error) {
      //   alert("Upload failed!");
      //   console.error(error);
      // } finally {
      //   setUploading(false);
      // }
    };

    return (
      <div className="upload-container">
        <h3>Upload Data</h3>
        <div {...getRootProps()} className="dropzone">
          <input {...(getInputProps() as any)} />
          {props.data.length ? (
            <>
              <div style={{ flexDirection: "row" }} className="preview-images">
                {props.data.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image.image}
                    alt="Preview"
                    className="preview-image"
                  />
                ))}
              </div>
              {props.data.length > 4 && (
                <p>{`+${props.data.length - 4} more`}</p>
              )}
            </>
          ) : (
            <p>Drag & drop an image or click to select</p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!props.data || uploading}
          className="upload-button"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    );
  }
);
