# Kinetic Energy
A shopping cart experience for buying NFTs via the OpenSea API

The application consists of two microservices, an api and a ui.

After cloning the repo, take the following steps to run the app.

## UI
The UI is a single page application built with Vite Typescript and utilizing React Query 

Note: All of the following UI commands should be ran from within the UI directory.

## Installation

run `yarn install`

## Start

After the successfull installation of the packages: `yarn dev`

## API
The API is a server built using Nest.js, Fastify, GraphQL, TypeORM, and Postgres database.

Note: All of the following API commands (except homebrew and postgres specific commands) should be ran from within the api directory.

## Installation

```bash
$ yarn install
```

## Setting up the database
You will need Postgres in order to use this app. The best way to download this if you do not have it is via homebrew. If you do not have homebrew you can follow the steps for downloading that at:

https://brew.sh/

Once you have homebrew you can download Postgres with the following command:

```bash

$ brew install postgresql

```

This will give you access to the psql and createdb commands in terminal if you want to do any actions with postgres directly. We will want to create the db called kinetic which I have supplied an npm script for in the package.json. That script is:

```bash
$ yarn run db:create
```

Once the kinetic database is created you will need to set your database environment variables as well as a few other environment variables before running the app.

Please see the .env.example file. This should be converted to a hidden .env file which is .gitignored for security purposes. Do not commit your api keys! All environment variables have been provided except the OPEN_SEA_API_KEY. This app is built on top of the Open Sea API. You will need to apply for an API key and set this environment variable. If you can not apply for a key you can also use the testnets url for the OPEN_SEA_BASE_URL variable.

With your database set up and your env vars set you should be good to go to run the app with the commands below:

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```