[![Build Status](https://travis-ci.org/piglovesyou/snapp.svg?branch=master)](https://travis-ci.org/piglovesyou/snapp)
[![npm version](https://badge.fury.io/js/snapp.svg)](https://badge.fury.io/js/snapp)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Quramy/ts-graphql-plugin/master/LICENSE.txt)

Snapp is a GraphQL Web framework.

## Concept

GraphQL provides not only many solutions to Web Front-end, but a way to think how Web application can organize data, resolved in both server-side and client-side.

Snapp boosts up data binding process in web app through GraphQL, with HMR development environment and production build functionality included out of the box.

### Features:

- Able to `import { useData } from './query.graphql'`, powered by [react-apollo](https://github.com/apollographql/react-apollo) and [GraphQL Codegen](https://github.com/dotansimha/graphql-code-generator)
- Automatically wires-up code including schema, resolver to build GraphQL server
- TypeScript, React, Passport and SSR are built-in (and mandatory to use)
- Builds optimised bundle

## Getting Started

```bash
# Initialize project
mkdir my-snapp && cd $_
npm init --yes

# Install dependencies
npm install -D snapp
npm install -S react react-dom  # Peer deps

# Place project boilerplate files
npx snapp init
npx snapp codegen  # Generates wiring-up source and some .graphql.d.ts
npx tsc  # Enjoy types

# Start development
npx snapp start  # Popup browser. Enjoy HMR

# Build production app
npx snapp build

# Run production app
cd build
npm install
node server.js
```

Production build doesn't depend on `snapp` as it's dev environment 👍

## Special Directories

Snapp recognized six directories in project root as special:

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

Specify page titles and other metadata with `snapp/Head` component.

```tsx
const title = 'Home';
export default const Home = () => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <h1>{title}</h1>
    </div>
);
```

`props.routeContext` is available in all route components.

```tsx
export type RouteContextTypes = {
  pathname: string; // ex.) /about/me
  query?: ParsedQuery<string>; // ex.) q of ?q=graphapp
  params?: QueryParams; // ex.) id of /posts/:id
};
```

A leading underscore of route directory/file name indicates route params.

```tsx
/* ./routes/posts/_id.tsx */
export default const PostDetail = (props) => (
  <div>{props.routeContext.params.id}</div>
);
```

### `public` - Your static files

- `./public/**`

All files located under `public` are served as static files by your application. Put files such as `favicon.ico` and `robots.txt` here.

### `config` - Configure Application

- `./config/*`

You can overrides framework files in `config`. `node_modules/snapp/dist/config/{modules}` by placing one with the same file name.

Example:

`./config/Html.tsx`

```tsx
import { HtmlPropTypes } from 'snapp/types';

export default const Html = (prop: HtmlPropTypes) => (
  <html>
    <head></head>
    <body>{prop.children}</body>
  </html>
);
```

## APIs

Your can import modules in `node_modules/snapp/dist/app` by `import 'snapp/{module}'.

Example:

```tsx
import useStyles from 'snapp/useStyles';
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
