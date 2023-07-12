export const getDifferenceInMinutes = (a: Date, b: Date) => {
  const differenceMs = Number(a) - Number(b);

  return Math.floor(((differenceMs % 86400000) % 3600000) / 60000);
};
