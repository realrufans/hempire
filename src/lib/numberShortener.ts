export const formatBalance = (number: number) => {
  if (number >= 1000000000) {
    // Billions
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000) {
    // Millions
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    // Less than a thousand
    return new Intl.NumberFormat("en-US").format(number);
  }
};
