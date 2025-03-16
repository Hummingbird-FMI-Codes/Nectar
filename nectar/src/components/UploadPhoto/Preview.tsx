import { memo } from "react";
import "./UploadPhoto.css";
import { ImageWithoutData } from "../../types/ImageUpload";

const MaxImagePreview = 9;

export const Preview = memo((props: { data: ImageWithoutData[] }) => {
  return (
    <div
      style={{
        width: "65%",
        height: "131px",
        marginBottom: "20px",
      }}
    >
      {props.data.length > 1 ? (
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
          <div className="dropzone">
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {props.data.slice(1, MaxImagePreview).map((image, index) => (
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
          </div>
        </div>
      ) : null}
    </div>
  );
});
