import { memo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import "./UploadPhoto.css";
import { ImageWithoutData } from "../../types/ImageUpload";
import { Black } from "../../consts";

const MaxImagePreview = 8;

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
      <div
        style={{
          width: "70%",
        }}
      >
        <div
          style={{
            marginRight: "20px",
            marginLeft: "20px",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div {...getRootProps()} className="dropzone">
            <input {...(getInputProps() as any)} />
            {props.data.length ? (
              <>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {props.data.slice(0, MaxImagePreview).map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt="Preview"
                      className="preview-image"
                    />
                  ))}
                  {props.data.length > MaxImagePreview && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>{`+${props.data.length - MaxImagePreview} more`}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  flexGrow: 1,
                }}
              >
                Drag & drop an image or click to select
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleUpload}
              disabled={!props.data || uploading}
              className="upload-button"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
