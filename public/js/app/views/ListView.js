// ListView.js

define(["jquery", "backbone", "models/Model", "models/Twitter", "text!templates/twitter-list.html"],

    function($, Backbone, Model, Twitter, template){

        // search for a status
        var ListView = Backbone.View.extend({
            el: '.example',
            events: {
                'click button#search': 'doSearch'
            },
            initialize: function() {
                self = this;
                _.bindAll(self, 'render', 'addItem');
                self.user = new Twitter.User();
                // Bind an event handler for the reset event.
                console.log(this.user);
                self.user.get('lists').bind('reset', function() {
                    // Clear any list
                    self.$('.lists').empty();
                    var lists = self.user.get('lists');
                    console.log('lists', lists);
                    lists.each(function(list) {
                        self.addItem(list);
                    });
                });
                self.counter = 0;
                self.render();
            },
            // This function is the event handler for the button click.
            // It tells the Tweets collection to fetch()
            doSearch: function() {
                var self = this;
                var id = $('#userId').val() || '1000';
                self.user.set('id', id);
                self.user.getLists(id);
            },
            render: function() {
                $(this.el).append(template);
                return this;
            },
            addItem: function(list) {
                console.log('list', list);
                $('ul', this.el).append("<li><b>" + list.get('name') + "</b>  </li>");
            }
        });

        // Returns the View class
        return ListView;

    }

);