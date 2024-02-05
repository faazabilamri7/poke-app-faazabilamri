export const capitalizeAndSpace = (text: string): string => {
  const words = text.split('-');

  const capitalizedWords = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalizedWords;
};
