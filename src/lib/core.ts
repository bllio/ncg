// Core functions for component generation.

import chalk from 'chalk';
import isIdentifier from 'is-identifier';

export function validateName(value: string) {
  const trimmed = value.trim();
  if (!isIdentifier(trimmed)) {
    console.error(
      chalk.red(
        `Error: Invalid component name '${trimmed}'. Please provide a valid JavaScript identifier.`,
      ),
      `\nFor more information, see ${chalk.underline('https://developer.mozilla.org/en-US/docs/Glossary/Identifier')}.`,
    );
    process.exit(1); // Just exit here since that's what program.error() does under the hood.
  }
  return trimmed;
}
