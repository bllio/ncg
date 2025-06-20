// Reusable utility functions.

export function capitalizeFirstLetter(word: string) {
  const [firstLetter, ...remainingLetters] = word;
  return firstLetter!.toUpperCase() + remainingLetters.join('');
}
