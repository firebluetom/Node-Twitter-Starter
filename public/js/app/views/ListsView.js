// ListsView.js

define(["jquery", "backbone", "models/Model", "models/Twitter", "text!templates/twitter-lists.html"],

    function($, Backbone, Model, Twitter, template){

        var ListsView = Backbone.View.extend({
            el: '.example',
            events: {
                'click button#search': 'getLists'
            },
            initialize: function() {
                self = this;
                _.bindAll(self, 'render');
                self.screenLists = new Twitter.ListOfLists();
                self.screenLists.bind('change', function(){
					// console.log('current users', self.screenLists);
					self.screenLists.each(function(list){
						self.addUsers(list);
					});
					self.screenLists.each(function(list){
						self.addLists(list, self.screenLists.listsForScreenname);
					});
                });
                self.counter = 0;
                self.render();
            },
            getLists: function() {
                var self = this;
                var screenName = $('#screenName').val() || 'SproutSocial';
                self.screenLists.set('screenName', screenName);
                self.screenLists.addProfileLists(screenName);
            },
            render: function() {
                $(this.el).append(template);
                return this;
            },
            addUsers: function(list) {
				// console.log('list', list);

				if(!list.get('id')) // need user id
					return;

				var listId = list.get('id');
				var listName = list.get('name').split(' ').join('');
				var users = list.get('users');
				// add all users
				for(var index in users){
					var user = users[index];
					var userId = user.id;

					if(!$('#'+userId).length){ // if user has not been added to the list, add it
						$('ul', this.el).append("<div class='user' id='" + userId + "'><b>" + user.name + "</b>  </div>");
					}
				}
            },
            addLists: function(list, allLists){
				if(!list.get('id')) // need user id
					return;

				var listId = null;

				// for(var ind in allLists){
				// 	var savedList = allLists[ind];
				// 	listId = savedList.id;
				// 	listName = savedList.name;
				// 	if(!$('.user').children('.list-' + listId).length ){
				// 		$('.user').append("<div class='not-in-list list-" + listId + "'>" + listName + "</div>");
				// 	}
				// }

				listId = list.get('id');
				listName = list.get('name').split(' ').join('');
				var users = list.get('users');
				// console.log('users', users);

				// add all lists to all users
				if(!$('.user').children('.list-' + listId).length ){
					$('.user').find(".list-" + listId).remove();
					$('.user').append("<div class='not-in-list list-" + listId + "'>" + listName + "</div>");
				}
				// check if user is in a list
				for(var ind in users){
					var userToFind = users[ind];
					var userToFindId = userToFind.id;

					$('#'+userToFindId).children('.list-'+listId).addClass('in-list').removeClass('not-in-list')
					$('#'+userToFindId).children('.list-'+listId).find('.checkmark').remove();
					$('#'+userToFindId).children('.list-'+listId).prepend('<span class="checkmark"></span>');

				}
            }
        });

        return ListsView;
    }

);