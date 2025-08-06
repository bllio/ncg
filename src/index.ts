#!/usr/bin/env node

// Program entry-point for ncg.

import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';

import { generate } from './commands/ncg-new.js';

import packageConfig from '../package.json' with { type: 'json' };

const { version } = packageConfig;

const program = new Command();
program
  .name('ncg')
  .version(`ncg version ${version}`)
  .description(
    `ncg is a command-line tool for generating React TypeScript components.`,
  )
  .addHelpText(
    'before',
    `ncg - New component generator [version ${version}]\n`,
  );

program
  .command('new')
  .description('generate a component file')
  .argument('<componentName>', 'name of the component')
  .showHelpAfterError('Run `ncg new --help` for the usage guide')
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
