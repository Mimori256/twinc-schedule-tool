import type { RescheduleData } from "../types/RescheduleData";
import checkValidDays from "./checkValidDays";

type ValidiateResult = {
  isValid: boolean;
  errmsg: string;
};

const validiateRescheduleData = (data: RescheduleData) => {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  if (data.date === null || data.replaceDay === null) {
    return false;
  } else if (!daysOfWeek.includes(data.replaceDay)) {
    return false;
  } else if (daysOfWeek[new Date(data.date).getDay()] === data.replaceDay) {
    return false;
  }
  return true;
};

const validiateData = (
  dateSelectorValues: any,
  holidayValues: string[],
  rescheduleSelectorValues: RescheduleData[],
  deadlineValues: string[]
): ValidiateResult => {
  let errmsg = [];

  // Check holiday values
  if (dateSelectorValues.length !== 14) {
    errmsg.push("開始/終了日の入力が足りません");
  }
  if (holidayValues.length === 0) {
    errmsg.push("祝日を埋めてください");
  }
  if (deadlineValues.length === 0) {
    errmsg.push("締切日を埋めてください");
  }
  if (!checkValidDays(holidayValues.join(","))) {
    errmsg.push("祝日の入力に問題があります");
  }
  if (!checkValidDays(deadlineValues.join(","))) {
    errmsg.push("締め切り日の入力に問題があります");
  }

  rescheduleSelectorValues.forEach((value) => {
    if (!validiateRescheduleData(value)) {
      errmsg.push("振替日の入力に問題があります");
    }
  });

  if (errmsg.length === 0) {
    return { isValid: true, errmsg: "" };
  } else {
    return { isValid: false, errmsg: errmsg.join("\n") };
  }
};

export default validiateData;
