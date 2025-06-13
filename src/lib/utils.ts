// Reusable utility functions.

const capitalizeFirstLetter = (word: string) => {
  const [firstLetter, ...remainingLetters] = word;
  return firstLetter!.toUpperCase() + remainingLetters.join('');
};

export { capitalizeFirstLetter };
