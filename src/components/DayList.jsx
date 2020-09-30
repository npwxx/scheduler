import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { day, days, setDay } = props;

  return (
    <ul>
      {days.map((d) => {
        return (
          <DayListItem
            key={d.id}
            name={d.name}
            spots={d.spots}
            selected={d.name === day}
            setDay={() => setDay(d.name)}
          />
        );
      })}
    </ul>
  );
}
