// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Model", "views/View", "views/StatusView", "views/ListView", "views/ListsView", "collections/Collection"],

    function($, Backbone, Model, View, StatusView, ListView, ListsView, Collection) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index",
                "search": "search",
                "list": "list",
                "lists": "lists"
            },

            index: function() {
                // Instantiates a new view which will render the header text to the page
                new View();
            },
            search: function(){
                new StatusView();
            },
            list: function(){
                new ListView();
            },
            lists: function(){
                new ListsView();
            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);