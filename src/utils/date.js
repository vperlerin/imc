// ---- Utilities ----
const getDaySuffix = (day) => {
  const d = Number(day);
  if (!Number.isFinite(d)) return "";
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
    // Try native; if there's a space, try replacing with 'T'
    const try1 = new Date(input);
    if (!Number.isNaN(try1.getTime())) return try1;
    const try2 = new Date(input.replace(" ", "T"));
    if (!Number.isNaN(try2.getTime())) return try2;
  }

  return new Date(NaN);
};

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

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
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + Number(days)
  ));
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
  if (!isValidDate(date)) return ""; // safe fallback

  const { day, monthName, weekday, year } = getParts(date, { locale, timeZone });
  const formattedDay = `${day}${getDaySuffix(day)}`;

  return `${includeWeekday ? `${weekday}, ` : ""}${formattedDay}${includeMonth ? ` ${monthName}` : ""}${includeYear ? ` ${year}` : ""}`;
};

const parseDateYMD = (str) => {
  const [y, m, d] = String(str).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const formatConferenceDates = (start, end, { locale = "en-US", timeZone = "UTC" } = {}) => {
  const startDate = parseDateYMD(start);
  const endDate = parseDateYMD(end);
  if (!isValidDate(startDate) || !isValidDate(endDate)) return "";

  const s = getParts(startDate, { locale, timeZone });
  const e = getParts(endDate, { locale, timeZone });

  const sameMonth = s.monthName === e.monthName && startDate.getUTCFullYear() === endDate.getUTCFullYear();

  if (sameMonth) {
    return `${s.monthName} ${s.day}${getDaySuffix(s.day)} - ${e.day}${getDaySuffix(e.day)}`;
  }

  // Different month and/or year
  const left = `${s.monthName} ${s.day}${getDaySuffix(s.day)}${startDate.getUTCFullYear() !== endDate.getUTCFullYear() ? ` ${s.year}` : ""}`;
  const right = `${e.monthName} ${e.day}${getDaySuffix(e.day)} ${e.year}`;
  return `${left} - ${right}`;
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
