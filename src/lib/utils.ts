// Reusable utility functions.

function capitalizeFirstLetter(word: string) {
  const [firstLetter, ...remainingLetters] = word;
  return firstLetter!.toUpperCase() + remainingLetters.join('');
}

export { capitalizeFirstLetter };
