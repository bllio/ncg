#!/usr/bin/env node

// Entry-point for `ncg new` subcommand.

import {
  compileTemplate,
  validateComponentName,
  writeToFile,
} from '../lib/core.js';

// We name it `generate` so that it doesn't conflict with the `new` keyword in
// JavaScript.
export function generate(componentName: string) {
  const validatedName = validateComponentName(componentName);
  const component = compileTemplate(validatedName);
  writeToFile(validatedName, component);
}
