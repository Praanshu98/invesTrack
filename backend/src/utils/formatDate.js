// Function to split date in day, month, year
const getDayMonthYear = (date) => {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
    .format(date)
    .replace(",", "")
    .split(" ");
};

// Function to parse the date and return the latest date for which NAV could be fetched
const parseWeekDayDate = (date = new Date()) => {
  try {
    // If day is Sunday or Monday, set date to a day or two prior respectively
    const weekday = Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);

    if (weekday === "Sun") {
      date.setDate(date.getDate() - 1);
    } else if (weekday === "Mon") {
      date.setDate(date.getDate() - 2);
    }

    // Set date to a day prior since NAV's are available for the previous day
    date.setDate(date.getDate() - 1);

    // Adjust time offset to UTC
    date.setTime(correctTimezoneOffset(date));

    const [month, day, year] = getDayMonthYear(date);

    return [day, month, year];
  } catch (error) {
    console.log(`========== Error parsing date ==========`);
    throw new Error(error);
  }
};

// Function to correct the timezone offset, set time to UTC and return the date
const correctTimezoneOffset = (date) => {
  date = new Date(date);
  date = new Date(date.getTime() + date.getTimezoneOffset() * -1 * 60 * 1000);
  return date;
};

export { parseWeekDayDate, correctTimezoneOffset, getDayMonthYear };
