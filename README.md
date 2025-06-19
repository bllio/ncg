# ncg

> New component generator

**ncg** is a command-line tool for generating [React][react] [TypeScript][typescript] components.

[![GitHub License](https://img.shields.io/github/license/bllio/ncg)](LICENSE)

- [ncg](#ncg)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Creating a component](#creating-a-component)
      - [Component naming](#component-naming)
    - [Display help menu](#display-help-menu)
    - [Version check](#version-check)
  - [Background](#background)
  - [Alternative(s)](#alternatives)
  - [License](#license)

## Installation

To install ncg using [npm][npm], run the following command in your terminal:

```sh
npm install --global @bllio/ncg
```

## Usage

### Creating a component

To create a component, in your terminal run:

```sh
ncg new <componentName>
```

where `<componentName>` is the name of the component you want to create.

For example, to create a component named `Card` you can run:

```
ncg new Card
```

This creates a `Card.tsx` file in the current working directory with the following content:

```tsx
function Card() {
  return <div></div>;
}

export default Card;
```

If a file with the same name already exists in the current working directory, the operation will be cancelled without creating any files.

#### Component naming

The `ncg new` command only accepts a valid JavaScript identifier name as the component name. The argument passed to the command is validated using the [`is-identifier`][is-identifier] module.

As per the [official React documentation][react-component-casing], React component names must always start with a capital letter. For convenience, ncg accepts the component name under several different casings. It will automatically capitalize the first letter of the provided component name.

For example, all these three variations are valid and will result in a `ListItem` component:

```sh
ncg new ListItem

ncg new listItem

ncg new 'listItem'
```

Any other variation or invalid forms of identifier names will cause the operation to be cancelled.

### Display help menu

To display all available options and commands, run:

```sh
ncg --help
```

### Version check

To check the currently-installed version, run:

```sh
ncg --version
```

The output should look similar to this:

```sh
version 0.0.1
```

## Background

ncg was originally designed as a tool to generate React components that make use of the JavaScript [barrel pattern][barrel]. At the time, I was using the directory structure described in [this blog post][directory-structure-post] for most of my React-based projects, so the initial design for ncg was based on the [`new-component`][new-component] tool developed by the author of the post [Josh Comeau][joshwcomeau].

I wrote my own version of `new-component` from scratch so that I could learn how to write a command-line tool which I could then use in my development workflows. Nowadays, I prefer to organize my React projects differently, and naturally ncg's designs evolved towards a different, more flexible solution.

ncg is currently under active development, though it is primarily a hobby project that I work on in my own free time.

## Alternative(s)

Since ncg itself is still actively being developed, it might be unstable in certain cases. For serious projects, consider using more mature tools like the following package(s):

- [new-component][new-component] - CLI tool for quickly scaffolding new components.

## License

This project is licensed under the [MIT License](LICENSE).

<!-- URLs -->

[react]: https://react.dev/
[typescript]: https://www.typescriptlang.org/
[is-identifier]: https://github.com/sindresorhus/is-identifier
[react-component-casing]: https://react.dev/learn#:~:text=React%20component%20names%20must%20always%20start%20with%20a%20capital%20letter
[directory-structure-post]: https://www.joshwcomeau.com/react/file-structure/
[barrel]: https://basarat.gitbook.io/typescript/main-1/barrel
[new-component]: https://github.com/joshwcomeau/new-component
[joshwcomeau]: https://github.com/joshwcomeau
[generate-react-cli]: https://github.com/arminbro/generate-react-cli
[npm]: https://docs.npmjs.com/cli/commands/npm
