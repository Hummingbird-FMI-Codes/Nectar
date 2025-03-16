import { memo, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import "./UploadPhoto.css";
import { ImageWithoutData } from "../../types/ImageUpload";
import {
  ImageSize,
  LoaderSize,
} from "../ImageVisualisation/ImageVisualisation";

export const UploadPhoto = memo(
  (props: {
    data: ImageWithoutData[];
    setData: (data: ImageWithoutData[]) => void;
    upload: () => void;
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

            props.setData(
              images.map((image, index) => ({ ...image, id: index }))
            );
          } catch (error) {
            alert("Invalid JSON format.");
          }
        };

        reader.readAsText(uploadedFile);
      },
    } as unknown as DropzoneOptions);

    const handleUpload = async () => {
      setUploading(true);
      props.upload();
    };

    useEffect(() => {
      if (uploading && !props.data.length) {
        setUploading(false);
      }
    }, [!props.data.length && uploading]);

    return (
      <div
        style={{
          width: `${ImageSize}px`,
          height: `${ImageSize + LoaderSize + 30}px`,
          minWidth: `${ImageSize + 30}px`,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          marginRight: "20px",
          marginLeft: "20px",
          borderRadius: "5px",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        <div {...getRootProps()} className="dropzone">
          <input {...(getInputProps() as any)} />
          {props.data.length ? (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={props.data[0].image}
                  alt="Preview"
                  style={{
                    maxWidth: `${ImageSize}px`,
                    maxHeight: `${ImageSize}px`,
                  }}
                />
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
            disabled={!props.data.length || uploading}
            className="upload-button"
          >
            Process
          </button>
        </div>
      </div>
    );
  }
);
