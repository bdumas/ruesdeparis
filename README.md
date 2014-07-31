Rues de Paris (Streets of Paris)
================================


Users
-----

This web app displays informations (in French) about the street of Paris where the user is located.
Thus it can only be used in the area of Paris.

The application is hosted on [https://bdumas.github.io/ruesdeparis](https://bdumas.github.io/ruesdeparis).
It is available in the [Firefox Marketplace](https://marketplace.firefox.com/app/rues-de-paris) too.

Datas come from the following file [https://raw.githubusercontent.com/bdumas/ruesdeparis/gh-pages/java/export_opendata_voies_actuelles_2012-01-17.csv] provided by 
[Paris Open Data](http://opendata.paris.fr).

Reverse geocoding service (transformation of geographic coordinates into addresses) is provided by Google.

Note: this application was developed without smartphone and far from Paris. Hope the tests are good enough!
It mainly was for me an excuse to discover new front end technologies.


Developers
----------

### Project structure

* **app**: All the source files of the application
* **dist**: The packaged files (used by the hosted app)
* **java**: Data in CSV format and some Java code to transform it into JSON format
* **gruntfiles.js**: grunt tasks
* **package.json**: grunt dependencies

### Installation

* install [node](http://nodejs.org/)
* install grunt: `npm intall -g grunt-cli`
* install dependencies: `npm install`

### Grunt commands

* **default**: `grunt build` exports the packaged app into the "dist" folder
* **watch**: `grunt watch` jslint in real time
* **karma**: `grunt karma` launches unit tests

### End to end tests

* update webdriver: `node node_modules/protractor/bin/webdriver-manager update`
* launch selenium server: `node node_modules/protractor/bin/webdriver-manager start`
* launch local server: `grunt http-server`
* launch tests: `grunt  protractor`
