import { useEffect, useState } from "react";
import { ImageWithoutData } from "../../types/ImageUpload";
import { Black } from "../../consts";
import loaderGif from "../../assets/loader.gif";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";
import { Location } from "../HeatMap/types";
import { FMI_location } from "../HeatMap/FMI_location";
import { URL_MODEL } from "../../env/url";

export const ImageSize = 500;
export const LoaderSize = 50;

function base64ToFile(base64String: string, fileName = "upload.jpg") {
  // Split out the mime type from the base64 data
  const arr = base64String.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid base64 string. Could not extract MIME type.");
  }
  const mime = mimeMatch[1]; // e.g. "image/png"

  // Decode the actual base64 data
  const base64Data = arr[1];
  const byteString = atob(base64Data);
  const byteStringLength = byteString.length;
  const u8arr = new Uint8Array(byteStringLength);

  for (let i = 0; i < byteStringLength; i++) {
    u8arr[i] = byteString.charCodeAt(i);
  }

  // Create a File with the decoded data
  return new File([u8arr], fileName, { type: mime });
}

export const ImageVisualisation = function ImageVisualisation(props: {
  image: ImageWithoutData | undefined;
  loadNext: () => void;
  setLocation: (location: Location) => void;
}) {
  const [hasAnt, setHasAnt] = useState<boolean | undefined>();

  useEffect(() => {
    if (!props.image) {
      return;
    }

    const fetchData = async () => {
      if (!props.image) {
        return;
      }

      const file = base64ToFile(props.image.image, "upload.jpg");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("timestamp", new Date().toISOString());
      formData.append("lat", props.image.meta.location.lat.toString());
      formData.append("lng", props.image.meta.location.lng.toString());

      const response = await fetch(`${URL_MODEL}/image`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          return data.caption === "ANTS";
        })
        .catch(() => {
          return false;
        });

      const hasAnt = response ?? false;

      setHasAnt(hasAnt);
      if (hasAnt) {
        props.setLocation({
          lat: FMI_location.lat + Math.random() * 0.001,
          lng: FMI_location.lng + Math.random() * 0.001,
        });
      }

      setTimeout(() => {
        setHasAnt(undefined);
        props.loadNext();
      }, 3000);
    };

    fetchData();
  }, [props.image]);

  return (
    <div
      style={{
        width: `${ImageSize}px`,
        height: `${ImageSize + LoaderSize + 30}px`,
        minWidth: `${ImageSize + 30}px`,
        display: "flex",
        marginRight: "20px",
        marginLeft: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.image ? (
        <div>
          <img
            src={props.image.image}
            style={{
              maxWidth: `${ImageSize}px`,
              maxHeight: `${ImageSize}px`,
              borderRadius: `5px`,
              border: `10px solid ${
                hasAnt ? "#1BC47D" : hasAnt === false ? "#FA6464" : Black
              }`,
              objectFit: "contain",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={hasAnt ? like : hasAnt === false ? dislike : loaderGif}
              style={{
                width: `${LoaderSize}px`,
                height: `${LoaderSize}px`,
                // backgroundColor: hasAnt === undefined ? Black : "white",
              }}
              alt="Preview"
              className="preview-image"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
