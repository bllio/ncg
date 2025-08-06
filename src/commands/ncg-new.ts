#!/usr/bin/env node

// Entry-point for `ncg new` subcommand.

import { compileTemplate, writeToFile } from '../lib/core.js';

// We name it `generate` so that it doesn't conflict with the `new` keyword in
// JavaScript.
export function generate(componentName: string) {
  const component = compileTemplate(componentName);
  writeToFile(componentName, component);
}
