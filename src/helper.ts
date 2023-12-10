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

export const getDateFormat = (dateTime: string | Date): String => dayjs(dateTime).format('YYYY-MM-DD').toString();
export const getEndDateOfMonth = (dateTime: string | Date): String => dayjs(dateTime).endOf('month').format('YYYY-MM-DD').toString();

export const getEndOfCurrentMonth = (): String => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return dayjs(new Date(year, month + 1, 0)).format('YYYY-MM-DD').toString();
};


// Function to check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dayjs(date1).isSame(date2, 'day');
};

export const findMatchDate = (fixturesData: any[], selectedDate: Date): any[] => {
  const selectedDay = dayjs(selectedDate);
  const data = [];

  for (const item of fixturesData) {
    const fixtureDay = dayjs(item.fixture.matchDate);
    if (selectedDay.isSame(fixtureDay, 'day')) {
      data.push(item);
    }
  }
  return data;
};

export const dateDisplay =(inputDate: Date | string) => dayjs(inputDate).format('DD MMM YYYY').toString();

export const nextYearEnd = dayjs().add(1, 'year').endOf('year').toDate();

export const prevYearStart = dayjs().subtract(1, 'year').startOf('year').toDate();

