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

#### `./routes/**/*.tsx`

Directories and file names of `./routes/**/*.tsx` are interpreted as page routes. `./routes/index.tsx` is for a root page and `./routes/about.tsx` is for a `./about` route. Other extensions such as `.css` are all ignored, so feel free to place those to import from `.tsx`.

> `./routes/about.tsx` is equivalent to `./routes/about/index.tsx`

Also `./routes/posts/_id.tsx` generates `/posts/:id` route so use the parameter through `AppContext`.

```ts
/* ./routes/posts/_id.tsx */
import useAppContext from 'uwf/useAppContext'
const PostDetail = () => {
  const context = useAppContext()
  return <div>{context.params.id}</div>
};
export default
```

#### `./data/*.graphql`

Server side GraphQL Schema. Multiple `.graphql` files are concatenated. Starting from one file `./data/schema.graphql` is a good idea.

#### `./data/{Query,Mutation,Subscription,OTHER_TYPES}/*.ts`

Field resolvers for GraphQL Types. Expect a function to be `exprot default`. For example:

```ts
/* ./data/Query/posts.ts */
export default function(parent, args, context) {
  // resolve list of post data
  return posts;
}
```

The above function is used as a resolver of `type Query { posts: [Posts] }`.

#### `./state/**`

Local state GraphQL Schema. The rules of directorie/file structure are same as `./data/**`. While resolver functions are only for client-side, GraphQL Schema are also used in server-side so auto-generated TypeScript types are available.

## License

MIT
