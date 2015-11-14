Twitter Test Application
==================================
> A test application which utilizes a node server for interacting with Twitter's API and a front end client which consumes that data.

## Getting Started
   1. Download and install [Node.js](http://nodejs.org/#download)
   2. Clone this repository 
   3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g` or run console as admin in Win.
   4.  If you have installed [Grunt](http://gruntjs.com/) globally in the past, you will need to remove it first by typing `npm uninstall -g grunt`.  If it complains about user permissions, type `sudo npm uninstall -g grunt`.
   5.  Next, install the latest version of [Grunt](http://gruntjs.com/) by typing `npm install -g grunt-cli`.  If it complains about user permissions, type `sudo npm install -g grunt-cli`.
   6. Open the twitter-test-app folder in your console and type `npm install`, this will install dependencies
   7. Next, type `nodemon` (this will start your Node.js web server)
   8. To view the demo page, go to [http://localhost:8001/#/lists](http://localhost:8001/#/lists)
   9. To view the Jasmine test suite page, go to [http://localhost:8001/specRunner.html](http://localhost:8001/specRunner.html)
   10. To view the Plato complexity report, go to [http://localhost:8001/reports/](http://localhost:8001/reports/)

## Important - keys.json
> To use the Twitter API, you will need to have an application registered with [Twitter Apps](https://apps.twitter.com/). From there you will need to generate a consumer key/secret and access token/secret. Then you will need to paste those values into the keys.json file located in the /lib folder; The URL to access those keys would be something like: https://apps.twitter.com/app/#yourAppNumber#/keys

## Routes
Routes are definded in <code>/public/js/app/routers</code>, there is a desktop and mobile router, but currently only the desktop router is utilized. Styles weren't really built for any of these, it pretty much just contains text.
   1. /#/ -> shows only Hi! on launch.
   2. /#/search -> this page is searching for tweets by text.
   3. /#/list -> this page is for getting lists by user id.
   4. /#/lists -> This page is for getting users that belong to a list by screen name

## Thanks
> Thanks to BoilerplateMVC for [Backbone-Require-Boilerplate](https://github.com/BoilerplateMVC/Backbone-Require-Boilerplate), a great boilerplate to get started. Thanks to BoyCook for [TwitterJSClient](https://github.com/BoyCook/TwitterJSClient) for a simple Twitter client to get me started.
