# OpsTypePoints aka the Subjective Personality App

This app was developed in association with the [SubjectivePersonality.com](https://subjectivepersonality.wordpress.com/) blog.  The app's primary functionality at this time is to output various information pertaining to a type within the [Objective Personality System](https://subjectivepersonality.wordpress.com/2020/08/19/what-is-ops/), a typology system loosely based on the work of Carl Jung.

## Dev Tools

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.  It uses Bootstrap 4.5.2 for providing basic responsive design.

## Initial Setup

1) Clone repo
2) Run `npm install` at root
3) Copy the local-api-template.js and create a local-api.js file with your api credential.  Note: your key must have access to the databases being accessed within Airtable.
4) Run `npm start` - express server which serves the shared data retrieved from airtable
5) Run `npm install -g @angular/cli` to install anggular
6) Run `ng serve` - angular server which serves the angular frontend and interfaces with the express server

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` to run the express server locally.  This runs at `http://localhost:8080/` and stores the data used by every socket connection.  For now this is mostly data coming from airtable requests stored as maps on the server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
