// Entry-point for `ncg new` subcommand.

import path from 'node:path';

import chalk from 'chalk';

import { compileTemplate, writeToFile } from '../lib/core.js';

// We name it `generate` so that it doesn't conflict with the `new` keyword in
// JavaScript.
export function generate(name: string) {
  const filePath = path.join(process.cwd(), `${name}.tsx`);
  const content = compileTemplate(name);
  if (!writeToFile(filePath, content)) {
    console.error(
      chalk.red(`Error: Component '${name}' already exists at ${filePath}`),
    );
  }
  console.log(chalk.green(`Created component '${name}' at ${filePath}`));
}
