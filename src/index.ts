#!/usr/bin/env node

// Program entry-point for ncg.

import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';

import { validateName } from './lib/core.js';
import { generate } from './commands/generate.js';

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
  .action((componentName: string) => {
    generate(componentName);
  });

try {
  program.parse(process.argv);
} catch (error) {
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  }
  process.exit(1);
}
