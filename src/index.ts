#!/usr/bin/env node

// Program entry-point for ncg.

import { Command, Option } from '@commander-js/extra-typings';
import chalk from 'chalk';

import { validateName } from './lib/core.js';
import { generate, type GenerateCommandOptions } from './commands/generate.js';

import packageConfig from '../package.json' with { type: 'json' };

const { version } = packageConfig;

const program = new Command();
program
  .name('ncg')
  .version(`ncg version ${version}`)
  .addHelpText('before', `ncg - New component generator [version ${version}]\n`)
  .description(
    `ncg is a command-line tool for generating React TypeScript components.`,
  );

program
  .command('new')
  .description('generate a component file')
  .showHelpAfterError('Run `ncg new --help` for the usage guide')
  .argument('<componentName>', 'name of the component', validateName)
  .addOption(
    new Option('--lang <choice>', 'component programming language')
      .default('ts')
      .choices(['ts', 'js']),
  )
  .addOption(
    new Option(
      '--dry-run',
      'print the resulting component file path without creating a file',
    ),
  )
  .action((componentName: string, options: GenerateCommandOptions) => {
    generate(componentName, options);
  });

try {
  program.parse(process.argv);
} catch (error) {
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  }
  process.exit(1);
}
