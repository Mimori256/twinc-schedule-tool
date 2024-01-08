const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const formatDateYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  // add "0" if month or day is less than 10
  if (parseInt(month) < 10) {
    month = `0${month}`;
  }
  if (parseInt(day) < 10) {
    day = `0${day}`;
  }

  return `${year}${month}${day}`;
};

const getDaysOfWeek = (date: Date) => {
  const day = date.getDay();
  return daysOfWeek[day];
};

const getNextWeekDays = (date: Date): any => {
  const res: { [key: string]: string } = {};
  res[getDaysOfWeek(date)] = formatDateYYYYMMDD(date);

  // Calculate next 6 days
  // Exclude Sunday
  for (let i = 1; i <= 7; i++) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0) {
      res[getDaysOfWeek(date)] = formatDateYYYYMMDD(date);
    }
  }

  // Sort res by key according to daysOfWeek
  const sortedRes = Object.keys(res).map((k) => ({ key: k, value: res[k] }));
  sortedRes.sort((a, b) => {
    if (daysOfWeek.indexOf(a.key) < daysOfWeek.indexOf(b.key)) {
      return -1;
    }
    return 1;
  });

  const sortedObj = sortedRes.reduce((obj: any, item: any) => {
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
  }
  if (
    date >= dateSelectorValues["beginSpringB"].getTime() &&
    date <= dateSelectorValues["beginSpringC"].getTime()
  ) {
    return "springBHolidays";
  }
  if (
    date >= dateSelectorValues["beginSpringC"].getTime() &&
    date <= dateSelectorValues["beginFallA"].getTime()
  ) {
    return "springCHolidays";
  }
  if (
    date >= dateSelectorValues["beginFallA"].getTime() &&
    date <= dateSelectorValues["beginFallB"].getTime()
  ) {
    return "fallAHolidays";
  }
  if (
    date >= dateSelectorValues["beginFallB"].getTime() &&
    date <= dateSelectorValues["beginFallC"].getTime()
  ) {
    return "fallBholidays";
  }
  return "fallCHolidays";
};

const getModuleNameFromDate = (dateData: Date, dateSelectorValues: any) => {
  const date = dateData.getTime();

  if (
    date >= dateSelectorValues["beginSpringA"].getTime() &&
    date <= dateSelectorValues["beginSpringB"].getTime()
  ) {
    return "春A";
  }
  if (
    date >= dateSelectorValues["beginSpringB"].getTime() &&
    date <= dateSelectorValues["beginSpringC"].getTime()
  ) {
    return "春B";
  }
  if (
    date >= dateSelectorValues["beginSpringC"].getTime() &&
    date <= dateSelectorValues["beginFallA"].getTime()
  ) {
    return "春C";
  }
  if (
    date >= dateSelectorValues["beginFallA"].getTime() &&
    date <= dateSelectorValues["beginFallB"].getTime()
  ) {
    return "秋A";
  }
  if (
    date >= dateSelectorValues["beginFallB"].getTime() &&
    date <= dateSelectorValues["beginFallC"].getTime()
  ) {
    return "秋B";
  }

  return "秋C";
};

const createHolidayData = (datestring: string, nendo: number) => {
  const plusYearList = ["01", "02", "03"];
  if (plusYearList.includes(datestring.slice(0, 2))) {
    return `${nendo + 1}-${datestring.slice(0, 2)}-${datestring.slice(2, 4)}`;
  }
  return `${nendo}-${datestring.slice(0, 2)}-${datestring.slice(2, 4)}`;
};

const createDeadlinesData = (datestring: string, nendo: number) => {
  const plusYearList = ["01", "02", "03"];
  if (plusYearList.includes(datestring.slice(0, 2))) {
    return `${nendo + 1}${datestring.slice(0, 2)}${datestring.slice(2, 4)}`;
  }
  return `${nendo}${datestring.slice(0, 2)}${datestring.slice(2, 4)}`;
};

const createJSON = (
  SelectorValues: any,
  holidayValuesSource: string[],
  rescheduleSelectorValues: any,
  deadlineValuesSource: string[],
  nendo: number,
) => {
  const dateSelectorValues = SelectorValues;

  const res: any = {};
  const holidayValues = holidayValuesSource.map((v) => {
    return createHolidayData(v, nendo);
  });

  const deadlineValues = deadlineValuesSource.map((v) => {
    return createDeadlinesData(v, nendo);
  });

  // Parse holidays
  const holidayDateList = holidayValues.map((v) => new Date(v));
  res["springAHolidays"] = [];
  res["springBHolidays"] = [];
  res["springCHolidays"] = [];
  res["fallAHolidays"] = [];
  res["fallBHolidays"] = [];
  res["fallCHolidays"] = [];

  for (let i = 0; i < holidayDateList.length; i++) {
    res[getModuleFromDate(holidayDateList[i], dateSelectorValues)].push(
      holidayValues[i].replaceAll("-", ""),
    );
  }

  // Parse start/end dates
  for (const key in dateSelectorValues) {
    if (key.startsWith("begin")) {
      res[key] = getNextWeekDays(dateSelectorValues[key]);
    } else if (key.length !== 3) {
      res[key] = formatDate(dateSelectorValues[key]);
    }
  }

  const springEndDate = {
    A: formatDate(dateSelectorValues["SAE"]),
    B: formatDate(dateSelectorValues["SBE"]),
    C: formatDate(dateSelectorValues["SCE"]),
  };
  const fallEndDate = {
    A: formatDate(dateSelectorValues["FAE"]),
    B: formatDate(dateSelectorValues["FBE"]),
    C: formatDate(dateSelectorValues["FCE"]),
  };

  res["springEndDate"] = springEndDate;
  res["fallEndDate"] = fallEndDate;

  // Parse rescheduled classes
  const rescheduledDateList = [];
  const rescheduledClassList = [];
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

  res["timeStamp"] = `${nendo}0405T000000`;

  return res;
};

export default createJSON;
