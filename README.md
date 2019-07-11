[![Build Status](https://travis-ci.org/piglovesyou/uwf.svg?branch=master)](https://travis-ci.org/piglovesyou/uwf)

_uwf_ is a GraphQL and React based web framework.

## Concept

GraphQL is what conciliates troubles between UI and data, including one from database, external RESTful API and even client-side state. _uwf_ boosts up developers to get the benefits through a Next.js-like entrypoint.

#### Features:

- Auto wiring-up for routes and GraphQL schema/resolvers
- Server Side Rendering
- Bundling optimised production build

#### Bound technology stack:

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

## API

#### `./routes`

Directories and file names of `./routes/**/*.tsx` are interpreted as page routes.

#### `./data/*.graphql`

GraphQL Schema.

#### `./data/{Query,Mutation,Subscription,OTHER_TYPES}/*.ts`

Field resolvers for GraphQL Types. 

#### `./state/**`

Local state. Directories/files structure rules are same as ./data .

## License

MIT
