import { memo, use, useEffect, useState } from "react";
import { ImageWithoutData } from "../../types/ImageUpload";
import { Black } from "../../consts";
import loaderGif from "../../assets/loader.gif";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";
import { Location } from "../HeatMap/types";
import { FMI_location } from "../HeatMap/FMI_location";

const Size = 250;
const LoaderSize = 30;

export const ImageVisualisation = memo(function ImageVisualisation(props: {
  image: ImageWithoutData | undefined;
  loadNext: () => void;
  setLocation: (location: Location) => void;
}) {
  const [hasAnt, setHasAnt] = useState<boolean | undefined>();

  useEffect(() => {
    if (!props.image) {
      return;
    }

    // TODO BE CALL
    setTimeout(() => {
      const hasAnt = Math.random() > 0.5;
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
    }, 3000);
  }, [props.image]);

  return (
    <div
      style={{
        marginTop: "20px",
        width: `${Size}px`,
        height: `${Size + LoaderSize + 30}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.image ? (
        <div>
          <img
            src={props.image.image}
            style={{
              maxWidth: `${Size}px`,
              maxHeight: `${Size}px`,
              borderRadius: `${Size}px`,
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
});
