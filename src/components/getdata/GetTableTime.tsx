import { format } from "date-fns";
import React, { FC, useEffect, useState } from "react";

interface TableTimeProps {
  tableTime: Date;
}

function getDisplayTime() {
  return new Date();
}

const getTableTime: FC<TableTimeProps> = ({ tableTime }) => {
  // current time - open time
  const [openTime, setOpenTime] = useState<string>();

  // get time difference
  function getTimeDif() {
    const currentTime = getDisplayTime().getTime();
    const openTime = Date.parse(
      format(tableTime, "EEE MMM d yyyy HH:mm:ss xx")
    );
    const timeDif = currentTime - openTime;

    // console.log(timeDif);

    return timeDif;
  }

  // change format for display
  function getTimeDifFormat() {
    const timeDif = getTimeDif();

    let seconds = Math.floor(timeDif / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    const timeSpend =
      hours.toString().padStart(2, "0") +
      "h " +
      minutes.toString().padStart(2, "0") +
      "m " +
      seconds.toString().padStart(2, "0") +
      "s";

    return timeSpend;
  }

  // current time running
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpenTime(getTimeDifFormat());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-w-24">
      <span className="bg-info/20 rounded shadow-md text-neutral-content font-mono text-2xl p-2 w-full">
        {openTime ? openTime : " --h --m --s "}
      </span>
    </div>
  );
};

export default getTableTime;
