const checkValidHolidays = (text: string) => {
  const splited_text = text.split(",");
  const pattern = /^[0-9]{4}$/;
  let res = true;
  splited_text.forEach((value) => {
    value = value.trim();
    console.log(value);
    if (!pattern.test(value)) {
      res = false;
    }
  });

  return res;
};

export default checkValidHolidays;
