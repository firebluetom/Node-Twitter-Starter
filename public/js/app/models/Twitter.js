// Twitter.js

define(["jquery", "backbone", 'underscore'],

    function($, Backbone, _){

		var Twitter = Backbone.Model.extend();
		// a tweet
		var Tweet = Backbone.Model.extend();
		// a collection of tweets
		var Tweets = Backbone.Collection.extend({
			model: Tweet,
			url: '/api/search/tweets?q=test', // default url is for test query
			parse: function(response) {
				console.log('response from twitter: ', response);
				return response.statuses;
			}
		});

		// a user has two defining attributes in this application, a set of lists and an id, tweets can also be stored
		var User = Backbone.Model.extend({
			initialize: function(id){ // need to pass in an id to get a user
				this.set('id', id);
				this.set('lists', new UserSubscriptions(this.get('id')));
			},
			setId: function(id){
				this.set('id', id);
			},
			getLists: function(id){
				if(this.get('lists'))
					this.get('lists').refreshList(id);
			}
		});

		// a list
		var List = Backbone.Model.extend();

		// a user has two defining attributes in this application, a set of lists and an id
		var UserSubscriptions = Backbone.Collection.extend({
			model: List,
			userId: "",
			initialize: function(userId){ // to get lists, we need a user id
				this.userId = userId;
				if(userId)
					this.fetch();
				else
					console.log('no user id set to get subscriptions');
			},
			url: function(){
				return "/api/lists/subscriptions?count=1000&user_id=" + this.userId; // the url to get lists for the user
			},
			refreshList: function(id){
				console.log('refresh list');
				this.userId = id;
				this.fetch({reset: true});
			},
			parse: function(response){
				console.log('user subscriptions: ', response);
				return response.lists;
			}
		});

		// a list
		var ListTwo = Backbone.Model.extend({
			nextCursor: 0,
			initialize: function(){
				// assign the list id here
				var listId = this.get('id');
				this.listId = listId;
				// console.log('list two - a list with subscribers', this);
				// soon as you add new users to the list, get the cursor and find more items
				this.bind('add', function(model, collection, options){
					if(this.nextCursor){
						this.fetch({add: true});
					}
					// console.log('add fired', model);
					// this.followers = model.get('users');
				});
				if(listId)
					this.fetch({add: true});
			},
			listId: "",
			followers: {},
			getFollowers: function(){
				this.fetch();
			},
			url: function(){
				var genUrl = "/api/lists/subscribers?list_id=" + this.listId;
				if(this.nextCursor){
					genUrl += "&cursor=" + this.nextCursor;
				}
				return genUrl;
			},
			parse: function(response){
				// console.log('subscribers', response);
				this.nextCursor = response.next_cursor;
				return response;
			}
		});

		// manage lists by adding screennames and getting lists for them
		var ListOfLists = Backbone.Collection.extend({
			model: ListTwo,
			listOfScreenNames: [],
			listsForScreenname: [],
			currentScreenName: "",
			addProfileLists: function(screenName){
				if(screenName){
					screenName = screenName.trim();
					// this.listOfScreenNames.push(screenName);
					this.currentScreenName = screenName;
					this.fetch({add: true});
				} else {
					console.log('screen name missing');
				}
			},
			url: function(){
				return "/api/list/" + this.currentScreenName; // the url to get lists for the user
			},
			parse: function(response){
				// console.log('lists for screen name ', this.currentScreenName, response);
				this.listsForScreenname = this.listsForScreenname.concat(response);
				return response;
			}
		});

		var TrackedProfile = Backbone.Model.extend();

		var TrackedProfileList = Backbone.Collection.extend({
			model: TrackedProfile
		});

		Twitter.Tweet = Tweet;
		Twitter.Tweets = Tweets;
		Twitter.User = User;
		Twitter.List = List;
		Twitter.UserSubscriptions = UserSubscriptions;
		Twitter.ListOfLists = ListOfLists;

		return Twitter;

	}
);