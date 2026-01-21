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

function setFileExtension(lang: string) {
  if (lang === 'ts') {
    return 'tsx';
  } else if (lang == 'js') {
    return 'jsx';
  }
}

export interface GenerateCommandOptions extends OptionValues {
  lang: string;
  dryRun?: boolean;
}

// We name it `generate` so that it doesn't conflict with the `new` keyword in
// JavaScript.
export function generate(name: string, options: GenerateCommandOptions) {
  const capitalizedName = capitalize(name);
  const fileExtension = setFileExtension(options.lang);
  const filePath = path.join(
    process.cwd(),
    `${capitalizedName}.${fileExtension}`,
  );

  if (existsSync(filePath)) {
    console.error(
      chalk.red(
        `Error: Component '${capitalizedName}' already exists at ${filePath}`,
      ),
    );
    process.exit(1);
  }

  if (!options.dryRun) {
    try {
      const content = compileTemplate(capitalizedName);
      writeFileSync(filePath, content);
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      process.exit(1);
    }
  }

  console.log(
    chalk.green(`Created component '${capitalizedName}' at ${filePath}`),
  );
}
