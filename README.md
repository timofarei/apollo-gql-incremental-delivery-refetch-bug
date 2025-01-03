# apollo-gql-incremental-delivery-refetch-bug

A toy project test incremental delivery using apollo graphql

## Start GraphQL Server

```shell
cd graphql-server
npm install --legacy-peer-deps # ignore peer dependency issue in @apollo/server (caused by using experimental "graphql": "17.0.0-alpha.2" dependency)
npm run dev
```

The api is listening on http://localhost:4000/

## Start React Client

```
cd client
npm install
npm run dev
```

The client is running on http://localhost:5173/
