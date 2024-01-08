const ifValidDate = (date: string) => {
  const monthPart = parseInt(date.slice(0, 2));
  const dayPart = parseInt(date.slice(2, 4));

  if (monthPart > 12 || monthPart < 1) {
    return false;
  }

  if (dayPart > 31 || dayPart < 1) {
    return false;
  }

  return true;
};

const checkValidDays = (text: string) => {
  const splited_text = text.split(",");
  const pattern = /^[0-9]{4}$/;
  let res = true;
  for (const value of splited_text) {
    const trimmedValue = value.trim();
    if (!pattern.test(trimmedValue) || !ifValidDate(trimmedValue)) {
      res = false;
      break;
    }
  }

  return res;
};

export default checkValidDays;
