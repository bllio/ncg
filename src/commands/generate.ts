// Entry-point for `ncg new` subcommand.

import path from 'node:path';
import { readFileSync } from 'node:fs';

import chalk from 'chalk';
import Handlebars from 'handlebars';

import { writeToFile } from '../lib/core.js';

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
export function generate(name: string) {
  const filePath = path.join(process.cwd(), `${name}.tsx`);
  const content = compileTemplate(name);
  if (!writeToFile(filePath, content)) {
    console.error(
      chalk.red(`Error: Component '${name}' already exists at ${filePath}`),
    );
    process.exit(1);
  }
  console.log(chalk.green(`Created component '${name}' at ${filePath}`));
}
