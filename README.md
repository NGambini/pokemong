# Pokemo-ng

This project is a technical assesment for a job interview.

It consists of writing a small web app to display pokemons, using data from http://pokeapi.co/. 

## Overview

### Requirements

- [x] A user should be able to search for a pokemon by name.
- [x] The user can choose one pokemon from the search results to show more informations
about that pokémon.
- [x] The pokemon detail page should contain some basic info about the pokemon, its picture
and a representation of the following statistics: For each of that pokemon types (e.g: fire,
grass), how well this pokemon’s base stats (e.g speed, defense) compare to the average
base stats of the other pokemons of that type.
- [x] Additionally, the pokemon detail page should show a live list of the most recent tweets
related to that pokemon.
- [x] The detail page can be bookmarked for later direct access.

### Extra features

- Fuzzy search for pokemon search.
- Paginated pokemon view
- Persisting pokemons in local storage

### Stack used

- Angular 5
- Typescript
- ngrx/store (Redux implementation)
- [Vmware Clarity](https://vmware.github.io/clarity/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Make sure the backend server is running (see below)

## Backend

To query tweets, a backend is required as embedded timelines do not support dynamic hashtags (need to create an unique widget ID).
Copy config file template : `cp server/config.js.tpl server/config.js`.

You will need to set a _consumerkey_ and a _consumersecret_ in the file `server/config.js`. You can get yours here : https://apps.twitter.com/ 

To start the server, run `npm run server`.

## Unit tests

To run the tests, type `ng test`.

## Known issues

- When in the pokemon detail page, the UI can get laggy while querying pokemons (all type-related pokemons need to be requested to compute average stats.
