const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const formatDate = (dateStr, includeWeekday = false, includeMonth = true, includeYear = false) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const year = date.getFullYear();
  const formattedDay = `${day}${getDaySuffix(day)}`;

  return `${includeWeekday ? weekday + ", " : ""}${formattedDay}${includeMonth ? " " + month : ""}${includeYear ? " " + year : ""}`;
};

export const formatConferenceDates = (start, end) => {
  return `${formatDate(start)} - ${formatDate(end, false, false).split(" ")[0]}`;
};

 
export const formatFullDate = (dateStr, includeMonth = true) => {
  return formatDate(dateStr, true, includeMonth, false);
};