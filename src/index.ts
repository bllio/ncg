#!/usr/bin/env node

// Program entry-point for ncg.

import path from 'node:path';

import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';

import packageConfig from '../package.json' with { type: 'json' };

const { version } = packageConfig;
const commandsDirPath = path.join(import.meta.dirname, './commands/');

const program = new Command();
program
  .name('ncg')
  .version(`ncg version ${version}`)
  .description(
    `ncg is a command-line tool for generating React TypeScript components.`,
  )
  .addHelpText('before', `ncg - New component generator [version ${version}]\n`)
  .executableDir(commandsDirPath)
  .command('new <componentName>', 'generate a component file');

try {
  program.parse(process.argv);
} catch (error) {
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  }
  process.exit(1);
}
