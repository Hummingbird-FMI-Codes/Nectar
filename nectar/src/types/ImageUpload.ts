import { Location } from "../components/HeatMap/types";

export type ImageWithoutData = {
  id: number;
  image: string;
  meta: {
    location: Location;
    data: string;
  };
};
