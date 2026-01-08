// Entry-point for `ncg new` subcommand.

import path from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import type { OptionValues } from '@commander-js/extra-typings';
import chalk from 'chalk';
import Handlebars from 'handlebars';

import { capitalize } from '../lib/utils.js';

function compileTemplate(substitute: string) {
  const templatePath = path.join(
    import.meta.dirname,
    '../templates/component.handlebars',
  );
  const content = readFileSync(templatePath).toString();
  const template = Handlebars.compile(content);
  return template({ name: substitute });
}

// We name it `generate` so that it doesn't conflict with the `new` keyword in
// JavaScript.
export function generate(name: string, options: OptionValues) {
  let extension = '';
  if (options.lang === 'ts') {
    extension = 'tsx';
  } else if (options.lang == 'js') {
    extension = 'jsx';
  }
  const capitalizedName = capitalize(name);
  const filePath = path.join(process.cwd(), `${capitalizedName}.${extension}`);
  const content = compileTemplate(capitalizedName);
  if (existsSync(filePath)) {
    console.error(
      chalk.red(
        `Error: Component '${capitalizedName}' already exists at ${filePath}`,
      ),
    );
    process.exit(1);
  }
  try {
    writeFileSync(filePath, content);
    console.log(
      chalk.green(`Created component '${capitalizedName}' at ${filePath}`),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}
