export const convertDate = (isoDateString: string) => {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDateString);

  // Use the toLocaleDateString method to format the date as a string in the "vi" locale
  const formattedDateString = date.toLocaleDateString("vi", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDateString; // Output: "04/05/2023"
};
