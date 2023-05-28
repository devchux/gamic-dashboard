const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const hourlyRange = (data) => {
  const format = data?.map((x) => {
    const diff = new Date().getTime() - new Date(x).getTime();
    return Math.floor(diff / 3600000);
  });

  return format || [];
};

export const getDate = (date) => {
  const d = date || new Date();

  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
};
