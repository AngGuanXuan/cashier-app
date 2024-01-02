import { OperateTime } from "@prisma/client";
import { format } from "date-fns";
import { FC, useEffect, useState } from "react";

interface timeDataProps {
  timeData: OperateTime;
}

function getDisplayTime() {
  return new Date();
}

const GetOperateTimer: FC<timeDataProps> = ({ timeData }) => {
  // set current time
  const [clockText, setClockText] = useState(getDisplayTime());
  // current time - open time
  const [openTime, setOpenTime] = useState<string>();

  // get time difference
  function getTimeDif() {
    const currentTime = getDisplayTime().getTime();
    const openTime = Date.parse(
      format(timeData.createdAt, "EEE MMM d yyyy HH:mm:ss xx")
    );
    const timeDif = currentTime - openTime;

    // console.log(timeDif);

    let seconds = Math.floor(timeDif / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    const timeSpend = hours + "h " + minutes + "m " + seconds + "s";

    return timeSpend;
  }

  // current time running
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getDisplayTime());
      setOpenTime(getTimeDif().toString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex flex-col space-y-2">
        <div className="text-neutral-300 text-lg">
          {format(clockText, "do LLL yyyy hh:mm:ss a")}
        </div>
        <span className="font-mono text-5xl space-x-2">{openTime}</span>
        {/* <div>{openTime}</div> */}
      </div>
      <div>
        <span className="text-neutral-300">Hourly Rate: </span> RM
        {timeData.rate}
      </div>
    </div>
  );
};

export default GetOperateTimer;
