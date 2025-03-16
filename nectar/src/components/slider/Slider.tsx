import { useState } from "react";

export const MaxOffsetSlider = 30;

export const getDateFromOffset = (offset: number) => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - (MaxOffsetSlider - offset)); // Offset calculation
  return targetDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export default function Slider(props: {
  date: string;
  setData: (data: string) => void;
}) {
  const [value, setValue] = useState(MaxOffsetSlider);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    props.setData(getDateFromOffset(Number(e.target.value)));
  };

  return (
    <div
      className="flex flex-col items-center space-y-4 p-4"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label
        className="text-white"
        style={{
          textAlign: "center",
        }}
      >
        {props.date}
      </label>
      <input
        type="range"
        min="1"
        max={MaxOffsetSlider}
        value={value}
        onChange={onChange}
        className="w-full max-w-md h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
