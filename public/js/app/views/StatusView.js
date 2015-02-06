// StatusView.js
define(["jquery", "backbone", "models/Model", "models/Twitter", "text!templates/twitter-feed.html"],

    function($, Backbone, Model, Twitter, template){

        // search for a status
        var StatusView = Backbone.View.extend({
            el: '.example',
            events: {
                'click button#add': 'doSearch'
            },
            initialize: function() {
                _.bindAll(this, 'render', 'addItem');
                this.tweets = new Twitter.Tweets();
                _this = this;
                // Bind an event handler for the reset event.
                this.tweets.bind('reset', function(collection) {
                    // console.log('collection', collection);
                    // Clear any old tweet renderings
                    _this.$('#tweets').empty();
                    // For each tweet in the collection, we call addItem and
                    // and pass the tweet.
                    collection.each(function(tweet) {
                        _this.addItem(tweet);
                    });
                });
                this.counter = 0;
                this.render();
            },
            // This function is the event handler for the button click.
            // It tells the Tweets collection to fetch()
            doSearch: function() {
                var self = this;
                var subject = $('#search').val() || 'test';
                self.tweets.url = '/api/search/tweets?count=100&q=' + subject ;
                self.tweets.fetch({reset: true});
            },
            render: function() {
                $(this.el).append(template);
                return this;
            },
            addItem: function(item) {
                // console.log('item', item);
                $('ul', this.el).append("<li><b>" + item.get('user').name + "</b>:  " + item.get('text') + "</li>");
            }
        });

        // Returns the View class
        return StatusView;

    }

);