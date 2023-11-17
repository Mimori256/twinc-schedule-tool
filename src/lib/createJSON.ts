const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const formatDateYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  // add "0" if month or day is less than 10
  if (parseInt(month) < 10) {
    month = "0" + month;
  }
  if (parseInt(day) < 10) {
    day = "0" + day;
  }

  return `${year}${month}${day}`;
};

const getDaysOfWeek = (date: Date) => {
  const day = date.getDay();
  return daysOfWeek[day];
};

const getNextWeekDays = (date: Date): { [key: string]: string } => {
  let res: { [key: string]: string } = {};
  res[getDaysOfWeek(date)] = formatDateYYYYMMDD(date);

  // Calculate next 6 days
  // Exclude Sunday
  for (let i = 1; i <= 7; i++) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() === 0) {
      continue;
    } else {
      res[getDaysOfWeek(date)] = formatDateYYYYMMDD(date);
    }
  }

  // Sort res by key according to daysOfWeek
  let sortedRes = Object.keys(res).map((k) => ({ key: k, value: res[k] }));
  sortedRes.sort((a, b) => {
    if (daysOfWeek.indexOf(a.key) < daysOfWeek.indexOf(b.key)) {
      return -1;
    } else {
      return 1;
    }
  });

  let sortedObj = sortedRes.reduce((obj: any, item: any) => {
    obj[item.key] = item.value;
    return obj;
  }, {});

  return sortedObj;
};

const addTimeStamp = (yyyymmdd: string) => {
  return `${yyyymmdd}T130000Z;`;
};

const formatDate = (date: Date): string => {
  return addTimeStamp(formatDateYYYYMMDD(date));
};

const getModuleFromDate = (dateData: Date, dateSelectorValues: any) => {
  const date = dateData.getTime();

  if (
    date >= dateSelectorValues["beginSpringA"].getTime() &&
    date <= dateSelectorValues["beginSpringB"].getTime()
  ) {
    return "springAHolidays";
  } else if (
    date >= dateSelectorValues["beginSpringB"].getTime() &&
    date <= dateSelectorValues["beginSpringC"].getTime()
  ) {
    return "springBHolidays";
  } else if (
    date >= dateSelectorValues["beginSpringC"].getTime() &&
    date <= dateSelectorValues["beginFallA"].getTime()
  ) {
    return "springCHolidays";
  } else if (
    date >= dateSelectorValues["beginFallA"].getTime() &&
    date <= dateSelectorValues["beginFallB"].getTime()
  ) {
    return "fallAHolidays";
  } else if (
    date >= dateSelectorValues["beginFallB"].getTime() &&
    date <= dateSelectorValues["beginFallC"].getTime()
  ) {
    return "fallBholidays";
  } else {
    return "fallCHolidays";
  }
};

const getModuleNameFromDate = (dateData: Date, dateSelectorValues: any) => {
  const date = dateData.getTime();

  if (
    date >= dateSelectorValues["beginSpringA"].getTime() &&
    date <= dateSelectorValues["beginSpringB"].getTime()
  ) {
    return "春A";
  } else if (
    date >= dateSelectorValues["beginSpringB"].getTime() &&
    date <= dateSelectorValues["beginSpringC"].getTime()
  ) {
    return "春B";
  } else if (
    date >= dateSelectorValues["beginSpringC"].getTime() &&
    date <= dateSelectorValues["beginFallA"].getTime()
  ) {
    return "春C";
  } else if (
    date >= dateSelectorValues["beginFallA"].getTime() &&
    date <= dateSelectorValues["beginFallB"].getTime()
  ) {
    return "秋A";
  } else if (
    date >= dateSelectorValues["beginFallB"].getTime() &&
    date <= dateSelectorValues["beginFallC"].getTime()
  ) {
    return "秋B";
  } else {
    return "秋C";
  }
};

const createHolidayData = (datestring: string, nendo: number) => {
  const plusYearList = ["01", "02", "03"];
  if (plusYearList.includes(datestring.slice(0, 2))) {
    return `${nendo + 1}-${datestring.slice(0, 2)}-${datestring.slice(2, 4)}`;
  } else {
    return `${nendo}-${datestring.slice(0, 2)}-${datestring.slice(2, 4)}`;
  }
};

const createDeadlinesData = (datestring: string, nendo: number) => {
  const plusYearList = ["01", "02", "03"];
  if (plusYearList.includes(datestring.slice(0, 2))) {
    return `${nendo + 1}${datestring.slice(0, 2)}${datestring.slice(2, 4)}`;
  } else {
    return `${nendo}${datestring.slice(0, 2)}${datestring.slice(2, 4)}`;
  }
};

const createJSON = (
  SelectorValues: any,
  holidayValues: string[],
  rescheduleSelectorValues: any,
  deadlineValues: string[],
  nendo: number
) => {
  const dateSelectorValues = SelectorValues;

  console.log(deadlineValues);

  let res: any = {};
  holidayValues = holidayValues.map((v) => {
    return createHolidayData(v, nendo);
  });

  deadlineValues = deadlineValues.map((v) => {
    return createDeadlinesData(v, nendo);
  });

  // Parse holidays
  let holidayDateList = holidayValues.map((v) => new Date(v));
  res["springAHolidays"] = [];
  res["springBHolidays"] = [];
  res["springCHolidays"] = [];
  res["fallAHolidays"] = [];
  res["fallBHolidays"] = [];
  res["fallCHolidays"] = [];

  for (let i = 0; i < holidayDateList.length; i++) {
    res[getModuleFromDate(holidayDateList[i], dateSelectorValues)].push(
      holidayValues[i].replaceAll("-", "")
    );
  }

  // Parse rescheduled classes
  let rescheduledDateList = [];
  let rescheduledClassList = [];
  let replaceDate;
  let replaceDay;
  let moduleName;

  for (let i = 0; i < rescheduleSelectorValues.length; i++) {
    replaceDate = new Date(rescheduleSelectorValues[i].date);
    replaceDay = rescheduleSelectorValues[i].replaceDay;
    moduleName = getModuleNameFromDate(replaceDate, dateSelectorValues);
    rescheduledDateList.push(formatDateYYYYMMDD(replaceDate));
    rescheduledClassList.push(`${moduleName}:${replaceDay}`);
  }

  res["rescheduledDateList"] = rescheduledDateList;
  res["rescheduledClassList"] = rescheduledClassList;

  res["deadlinesDate"] = deadlineValues;

  console.log(res);
};

export default createJSON;
