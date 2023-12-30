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

    const timeSpend =
      hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";

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
    <div>
      <div>{format(clockText, "HH:mm:ss")}</div>
      <div>{openTime}</div>
    </div>
  );
};

export default GetOperateTimer;
