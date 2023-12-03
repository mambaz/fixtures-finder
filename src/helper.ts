import dayjs from "dayjs";

export const splitDateTime = (dateTime: string): { date: string, time: string } => {

  const date = dayjs(dateTime).format('DD MMM').toString();
  const time = dayjs(dateTime).format('HH:mm').toString();

  return { date, time };
}

export const getStartOfPreviousMonth = (): String => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return dayjs(new Date(year, month - 1, 1)).format('YYYY-MM-DD').toString();
};

export const getEndOfCurrentMonth = (): String => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return dayjs(new Date(year, month + 1, 0)).format('YYYY-MM-DD').toString();
};

// Function to check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
