export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const daysLicence = (startDate: string, endDate: string): number => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const timeDifference = Number(date2) - Number(date1); // Result in milliseconds

  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = timeDifference / millisecondsInDay;

  return Math.floor(daysDifference);
};
