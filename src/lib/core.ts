// Core functions for component generation.

import { writeFileSync } from 'node:fs';

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

// Thin wrapper around writeFileSync to separate program logic from file I/O.
export function writeToFile(path: string, content: string) {
  try {
    writeFileSync(path, content, { flag: 'wx' });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      // TypeScript does not recognize `code` as a property of `Error` unless we
      // typecast the error as `NodeJS.ErrnoException`.
      // For more information, see:
      // https://stackoverflow.com/questions/40141005/property-code-does-not-exist-on-type-error
      // https://github.com/nodejs/node/issues/46869#issuecomment-2111128428
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
        return false;
      }
    }
  }
}
