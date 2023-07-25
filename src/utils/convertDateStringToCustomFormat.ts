export const convertDateStringToCustomFormat = (dateString: string) => {
  const date = new Date(dateString);
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;

  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

  return `${formattedDay}.${formattedMonth}`;
};
