#!/usr/bin/env node

// Entry-point for `ncg new` subcommand.

import { Command } from '@commander-js/extra-typings';

import {
  validateComponentName,
  compileTemplate,
  writeToFile,
} from '../lib/core.js';

const program = new Command();
program
  .argument('<componentName>', 'name of the component')
  .addHelpText('before', 'generate a component file\n')
  .showHelpAfterError('Run `ncg new --help` for the usage guide')
  .action((componentName: string) => {
    const validatedName = validateComponentName(componentName);
    const component = compileTemplate(validatedName);
    writeToFile(validatedName, component);
  });

program.parse(process.argv);
