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

## Known Issues
- The way the Open Sea API is designed is that Collections are the top level entity. The NFT endpoints are such that you must provide an account, contract, or collection to get a group of NFTs. For this reason the main dashboard displays Collections of NFTs. You can then click on a Collection to query for a group of NFTs.
- Not all Collections have NFTs. Right now when you click on a Collection without NFTs you will just see a blank page.
- My first inclination was to use the identifier as a unique identifier. It does not seem to be a reliable way to uniquely identify NFTs. I don't believe the names are either nor the identifiers and names together. Some work needs to be done there to figure out the best way to uniquely identify them. Given that we currently use identifier as our unique id the Cart if buggy if we add multiple items with the same identifier.