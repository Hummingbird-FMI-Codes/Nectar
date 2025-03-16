import { memo, useEffect, useState } from "react";
import { HeatMapBase } from "./BaseHeatMap";
import { Location } from "./types";
import { ImageSize } from "../ImageVisualisation/ImageVisualisation";
import Slider, { getDateFromOffset, MaxOffsetSlider } from "../slider/Slider";
import { URL_DATABASE } from "../../env/url";

function getDayBoundaries(dateString: string) {
  const date = new Date(dateString);

  // Set start of the day (00:00:00)
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  // Set end of the day (23:59:59)
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    startDate: startOfDay.toISOString(),
    endDate: endOfDay.toISOString(),
  };
}

export const HeatMap = memo(function HeatMap(props: { points: Location[] }) {
  const [timestamp, setTimestamp] = useState(
    getDateFromOffset(MaxOffsetSlider)
  );
  const [dataByDate, setDataByDate] = useState<
    Record<string, Location[] | undefined>
  >({
    [getDateFromOffset(MaxOffsetSlider)]: props.points,
  });

  const onDataChange = async (date: string) => {
    setTimestamp(date);

    const { startDate, endDate } = getDayBoundaries(date);
    await fetch(
      `${URL_DATABASE}/animal-data/range?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (response) => {
      const res = await response.json();
      setDataByDate((prev) => ({
        ...prev,
        [date]: res,
      }));
    });
  };

  useEffect(() => {
    const date = getDateFromOffset(MaxOffsetSlider);

    setDataByDate((prev) => ({
      ...prev,
      [date]: props.points,
    }));
  }, [props.points]);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      <HeatMapBase
        width="100%"
        height={`${ImageSize}px`}
        points={dataByDate[timestamp] ?? []}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Slider date={timestamp} setData={onDataChange} />
      </div>
    </div>
  );
});
