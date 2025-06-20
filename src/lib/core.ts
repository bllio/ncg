// Core functions for component generation.

import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';
import Handlebars from 'handlebars';
import isIdentifier from 'is-identifier';

import { capitalizeFirstLetter } from './utils.js';

function validateComponentName(componentName: string) {
  const trimmedName = componentName.trim();
  if (!isIdentifier(trimmedName)) {
    console.error(
      chalk.red(
        `Operation aborted. Invalid component name '${componentName}'. Make sure to use a valid JavaScript identifier`,
      ),
    );
    process.exit(1);
  }
  return capitalizeFirstLetter(trimmedName);
}

function compileTemplate(componentName: string) {
  const templateFilePath = path.join(
    import.meta.dirname,
    '../templates/component.handlebars',
  );
  const content = readFileSync(templateFilePath).toString();
  const template = Handlebars.compile(content);
  return template({ name: componentName });
}

function writeToFile(componentName: string, content: string) {
  const fileName = `${componentName}.tsx`;
  const destinationFilePath = path.join(process.cwd(), fileName);
  try {
    writeFileSync(destinationFilePath, content, { flag: 'wx' });
    console.log(
      chalk.green(
        `Created component '${componentName}' at ${destinationFilePath}`,
      ),
    );
  } catch (error) {
    if (error instanceof Error) {
      // TypeScript does not recognize `code` as a property of `Error` unless we
      // typecast the error as `NodeJS.ErrnoException`.
      // For more information, see:
      // https://stackoverflow.com/questions/40141005/property-code-does-not-exist-on-type-error
      // https://github.com/nodejs/node/issues/46869#issuecomment-2111128428
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
        console.error(
          chalk.red(
            `Operation aborted. Component '${componentName}' already exists at ${destinationFilePath}`,
          ),
        );
        process.exit(1);
      }
    }
  }
}

export { validateComponentName, compileTemplate, writeToFile };
