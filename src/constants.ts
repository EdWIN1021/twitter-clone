export const monthData = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayData = Array(31)
  .fill(0)
  .map((_, index) => index + 1);

export const yearData = Array(new Date().getFullYear() - 1902)
  .fill(0)
  .map((_, index) => {
    return new Date().getFullYear() - index;
  });


  
