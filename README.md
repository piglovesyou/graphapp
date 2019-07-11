[![Build Status](https://travis-ci.org/piglovesyou/uwf.svg?branch=master)](https://travis-ci.org/piglovesyou/uwf)

_uwf_ is a GraphQL and React based web framework.

## Concepts

GraphQL is what conciliates troubles between UI and data, including one from database, external RESTful API and even client-side state. _uwf_ boosts up developers to get the benefits through a Next.js-like entrypoint.

#### Built-in supported features:

- Auto wiring-up for routes and GraphQL schema/resolvers
- Server Side Rendering
- Bundling optimised production build

#### Built-in technology stacks:

- All the Apollo toolset
- Webpack for development and production build
- TypeScript
- React
- Passport for authentication

#### Heavily inspired by:

- Apollo for its GraphQL perspective
- Next.js for its webpack magic and File System based routing
- React Starter Kit for its decent modern boilerplate defaults

## Usage

Install

```bash
$ yarn add uwf react react-dom
```

(TBD) Initialize directories

```bash
$ yarn uwf init
```

Start development server

```bash
$ yarn uwf start
```

Build production code

```bash
$ yarn uwf build
$ cd build
$ node server.js
```

## License

MIT
