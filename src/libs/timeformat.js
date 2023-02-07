function formatDate(time) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(time);
  // Monday 1st November 22:30
  let string = `${daysOfWeek[date.getDay()]} ${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${months[date.getMonth()]} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return string;
}

export default formatDate;
