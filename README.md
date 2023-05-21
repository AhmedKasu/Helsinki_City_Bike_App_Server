<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">helsinki_city_bike_app_Server</h3>

---

<p align="center">  A web app for journeys made with city bikes in the Helsinki Capital area.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a [pre-assignment for Solita Dev Academy Finland 2023.](https://github.com/solita/dev-academy-2023-exercise)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

> This project requires typescript & node 16 and above to run.
> If you encounter unexpected issues, please check out package.json to install the exact versions.

### Installing

A step by step series of examples that tell you how to get a development env running.

Install project dependencies

```
npm install
```

Run in development

```
npm run dev
```

### Coding style tests

Eslint is the project linter

```
npm run lint
```

## 🎈 Usage <a name="usage"></a>

Once the server is up and running, navigate to http://localhost:4000/ to start making queries on apollo sandbox.
Other graphql playgrounds may be used.

**_MongoDb uri environment variable is required to connect to MongoDB._**

To test the deployed server you may use its UI deployed [here](https://helsinki-city-bike-app.vercel.app/)

## 🚀 Deployment <a name = "deployment"></a>

Build for production

```
npm run postinstall
```

Test production build

```
npm start
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database

- [ApolloSever](https://www.apollographql.com/docs/apollo-server/) - GraphQL server library
- [GraphQL](https://graphql.org/) - Server Framework
- [Express](https://expressjs.com/) - Server Framework

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@AhmedKasu](https://github.com/AhmedKasu)
