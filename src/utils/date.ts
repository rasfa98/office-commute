export const getDifferenceInMinutes = (a: Date, b: Date) => {
  const differenceMs = Number(a) - Number(b);

  return Math.round(((differenceMs % 86400000) % 3600000) / 60000);
};
