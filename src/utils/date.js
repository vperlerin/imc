// ---- Utilities ----
const getDaySuffix = (day) => {
  const d = Number(day);
  if (d >= 11 && d <= 13) return "th";
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

// Robust date parser (handles Date | number | string)
const parseDateSafe = (input) => {
  if (input instanceof Date) return new Date(input.getTime());
  if (typeof input === "number") return new Date(input);

  if (typeof input === "string") {
    // Pure date: force UTC to avoid TZ drift across platforms
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const [y, m, d] = input.split("-").map(Number);
      return new Date(Date.UTC(y, m - 1, d));
    }
    // Try ISO; if there's a space, try replacing with 'T'
    const try1 = new Date(input);
    if (!Number.isNaN(try1)) return try1;
    const try2 = new Date(input.replace(" ", "T"));
    if (!Number.isNaN(try2)) return try2;
  }

  return new Date(NaN);
};

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d);

// Get parts safely, defaulting to UTC for consistency with pure dates
const getParts = (date, { locale = "en-US", timeZone = "UTC" } = {}) => {
  const day = Number(new Intl.DateTimeFormat(locale, { day: "numeric", timeZone }).format(date));
  const monthName = new Intl.DateTimeFormat(locale, { month: "long", timeZone }).format(date);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone }).format(date);
  const year = Number(new Intl.DateTimeFormat(locale, { year: "numeric", timeZone }).format(date));
  return { day, monthName, weekday, year };
};

// Add days in UTC (DST-proof)
const addDaysUTC = (date, days) => {
  const d = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + Number(days)
  ));
  return d;
};

// ---- Formatters ----
const formatDate = (
  dateInput,
  includeWeekday = false,
  includeMonth = true,
  includeYear = false,
  { locale = "en-US", timeZone = "UTC" } = {}
) => {
  const date = parseDateSafe(dateInput);
  if (!isValidDate(date)) return ""; // or return a fallback like "—"

  const { day, monthName, weekday, year } = getParts(date, { locale, timeZone });
  const formattedDay = `${day}${getDaySuffix(day)}`;

  return `${includeWeekday ? `${weekday}, ` : ""}${formattedDay}${includeMonth ? ` ${monthName}` : ""}${includeYear ? ` ${year}` : ""}`;
};

export const formatConferenceDates = (start, end, { locale = "en-US", timeZone = "UTC" } = {}) => {
  const s = parseDateSafe(start);
  const e = parseDateSafe(end);
  if (!isValidDate(s) || !isValidDate(e)) return "";

  const sParts = getParts(s, { locale, timeZone });
  const eParts = getParts(e, { locale, timeZone });

  const sameMonth = sParts.monthName === eParts.monthName && s.getUTCFullYear() === e.getUTCFullYear();

  if (sameMonth) {
    return `${sParts.monthName} ${sParts.day}${getDaySuffix(sParts.day)} - ${eParts.day}${getDaySuffix(eParts.day)}`;
  }
  // Different months (or years)
  return `${sParts.monthName} ${sParts.day}${getDaySuffix(sParts.day)} - ${eParts.monthName} ${eParts.day}${getDaySuffix(eParts.day)}`;
};

export const formatFullDate = (
  dateInput,
  includeMonth = true,
  includeYear = false,
  opts = {}
) => {
  return formatDate(dateInput, true, includeMonth, includeYear, opts);
};

export const formatFullDatePlusXDays = (
  dateInput,
  daysToAdd,
  includeMonth = true,
  includeYear = true,
  { locale = "en-US", timeZone = "UTC" } = {}
) => {
  const base = parseDateSafe(dateInput);
  if (!isValidDate(base)) return "";
  const shifted = addDaysUTC(base, daysToAdd);
  return formatFullDate(shifted, includeMonth, includeYear, { locale, timeZone });
};
