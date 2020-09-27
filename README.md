# Nest.js Exception Filter Bug

## Installation

```
yarn
```

or

```
npm install
```

## Running

```
yarn dev
```

or

```
npm run dev
```

## Bug Reproduction

#### Sets a cookie named `hello`

```sh
curl http://localhost:5000/set-cookie
```

#### Returns all the cookies

```sh
curl http://localhost:5000/get-cookie
```

#### This will send `status=401` as `req.cookies` is undefined in the middleware

```sh
curl http://localhost:5000/boom
```
