// Reusable utility functions.

export function capitalize(word: string) {
  const [firstLetter, ...remainingLetters] = word;
  return firstLetter!.toUpperCase() + remainingLetters.join('');
}
