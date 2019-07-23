[![Build Status](https://travis-ci.org/piglovesyou/uwf.svg?branch=master)](https://travis-ci.org/piglovesyou/uwf)
[![npm version](https://badge.fury.io/js/uwf.svg)](https://badge.fury.io/js/uwf)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Quramy/ts-graphql-plugin/master/LICENSE.txt)
<a class="github-button" href="https://github.com/piglovesyou/uwf" data-icon="octicon-star" data-show-count="true" aria-label="Star piglovesyou/uwf on GitHub">Star</a>

_uwf_ is a GraphQL Web framework. _Note that project is actively constructed and even the npm name can be renamed._

## Concept

GraphQL provides not only many solutions to Web Front-end, but a way to think how Web application can organise its data resolved in both server-side and client-side.

_uwf_ boosts up data binding process through GraphQL usage, with HMR development environment and production build functionality included out of the box.

### Features:

- Able to `import { useData, withData } from './query.graphql'`
- Auto wire-up of GraphQL schema, GraphQL resolvers and URL routes
- TypeScript, React and SSR are supported (and no other options 😉)
- Building optimised bundle

## Getting Started

```bash
# Initialize project
mkdir my-uwf && cd $_
npm init --yes

# Install dependencies
npm install -D uwf
npm install -S react react-dom  # Peer deps

# Place project boilerplate files
npx uwf init
npx uwf codegen  # Generates wiring-up source and some .graphql.d.ts
npx tsc  # Enjoy types

# Start development
npx uwf start  # Popup browser. Enjoy HMR

# Build production app
npx uwf build

# Run production app
cd build
npm install
node server.js
```

Production build of `uwf build` doesn't depend on `uwf`; it's optimised 👍

## Special Directories

_uwf_ recognized six directories in project root as special: `data`, `state`, `route`, `components`, `public` and `config`.

### `data` and `states` - Your GraphQL Definitions

- `./data/*.graphql`
- `./data/*/*.ts`
- `./state/*.graphql`
- `./state/*/*.ts`
- `./state/rootValue.ts`

```
(root)
  |
  +--+ data   // Server-side GraphQL Types and its resolvers go hrere
  |     +
  |     |
  |     +--+ schema.graphql   // `data/*.graphql` are recognized
  |     |                     // as GraphQL schema. Define your types here
  |     |
  |     +--+ Query            // Dirs of `data/[A-Z]*` are recognized
  |     |     |
  |     |     +---+ posts.ts  // `data/[A-Z]*/*.ts` are recognized as
  |     |     |               // field resolvers
  |     |     |               // This resolves `query { posts }`
  |     |     |
  |     |     +---+ users.ts  // resolves `query { users }`
  |     |
  |     +--+ Mutation
  |     |     |
  |     |     +---+ post.ts   // resolves `mutation { post }`
  |     |
  |     +--+ Post   // Any `data/[A-Z]*/*.ts` are recognized as types
  |     |     |
  |     |     +---+ comments.ts // resolves `comments` field of type `Post`
  |     |
  |     +--+ lib    // Lowercase dirs are ignored by framework
  |           |
  |           +---+ myFns.ts  // Also ignored
  |
  |
  +--+ state  // Client-side GraphQL Types and its resolvers go hrere
  |     |
  |     +--+ rootValue.ts   // `state/rootValue.ts` indicates
  |     |                   // initial state for users
  |     |
  |     +--+ schema.graphql // Same as server-side, `state/*.graphql` are
  |     |                   // recognized as GraphQL Schema, but
  |     |                   // this is only for client-side, such as
  |     |                   // `isModalOpen` or `selectedRows`
  |     +--+ Query
  |     |     |
  |     |     +---+ isModalOpen.ts  // resolve `query { isModalOpen @client }`
  |     |     |
  |     |     +---+ selectedRows.ts  // resolve `query { selectedRows @client }`
  |     |
  |     +--+ Mutation
  |     |     |
  |     |     +---+ openModal.ts  // resolve `mutation { openModal @client }`
  |     |     |
  |     |     +---+ selectRows.ts  // resolve `mutation { selectRows @client }`
  |     |
  |     +--+ lib    // Lowercase letter dir is ignored by framework
  |
```

Also route variable is available. `./routes/posts/_id.tsx` generates `/posts/:id` so use the `id` parameter through `AppContext`.

```tsx
/* ./routes/posts/_id.tsx */
import useAppContext from 'uwf/useAppContext'
const PostDetail = () => {
  const context = useAppContext()
  return <div>{context.params.id}</div>
};
export default
```

### `routes` and `components` - Your Pages and GraphQL Documents (e.g. `query {}`)

- `./routes/**/*.tsx`
- `./routes/**/*.graphql`
- `./components/**/*.graphql`

```
(root)
  |
  +--+ routes   // Dirs and files of `routes/**/*.tsx` indicates your URL routes
  |     +
  |     |
  |     +--+ index
  |     |     |
  |     |     +---+ index.tsx // `${hostname}/` is routed here
  |     |     |
  |     |     +---+ posts.graphql // `routes/**/*.graphql` are recognized as
  |     |     |                   // GraphQL Documents (queries and mutations)
  |     |     |
  |     |     +---+ blaa.css  // Other extensions are ignored from framework
  |     |
  |     +--+ posts
  |     |     |
  |     |     +---+ index.tsx // `${hostname}/posts` is routed here
  |     |
  |     +--+ about.tsx  // `${hostname}/about` is routed here
  |
  +--+ components
  |     |
  |     +--+ modalState.graphql // `components/**/*.graphql` are also recognized
  |     |                       // as GraphQL Documents
```

### `public` - Your static files

- `./public/**`

All files located under `public` are served as static files by your application. Put files such as `favicon.ico` and `robots.txt` here.

### `config` - Configure Application

- `./config/*`

You can overrides framework files in `config`. `node_modules/uwf/dist/config/{modules}` by placing one with the same file name.

Example:

`./config/Html.tsx`

```tsx
import {DefaultHtmlPropTypes} from 'uwf/types';

export default const Html = (prop: uwf.HtmlPropTypes) => (
  <html>
    <head></head>
    <body>{prop.children}</body>
  </html>
);
```

## APIs

Your can import modules in `node_modules/uwf/dist/app` by `import 'uwf/{module}'.

Example:

```tsx
import useStyles from 'uwf/useStyles';
import s from './post.css';

export default const Post = (props: {}) => {
  useStyles(s);
  return (...);
};
```

## Attributes

### Bound technology stack:

- All the Apollo toolset
- Webpack for development and production build
- TypeScript
- React
- Passport for authentication

### Heavily inspired by:

- Apollo for its GraphQL perspective
- Next.js for its webpack magic and File System based routing
- React Starter Kit for its decent modern boilerplate defaults

## License

MIT

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
