var PromptsActions = require('../actions/PromptsActions');
var RedditApi = require('./RedditApi');
var _ = require('../../node_modules/react-native/node_modules/underscore');

var reactNativeStore = require('react-native-store');

var LocalStorage = {

	// Prompts related Storage
	getPrompts: function() {
		reactNativeStore.model("prompts").then(function(db) {
			db.find(null,{limit : 1000}).then(function(data) {
				var _prompts = [];
				for (var i = 0; i < data.length; i++) {
					_prompts[i] = data[i].prompt;
					_prompts[i].isSaved = true;
				};
				_prompts = _prompts.reverse();
				PromptsActions.getPrompts(_prompts, 'saved');
			})
		})
	},

	getPromptComments: function(index) {
		reactNativeStore.model("prompts").then(function(db) {
			db.find({id:index})
			.then(function(data) {
				PromptsActions.getComments(data[0].comments);
			})
		})
	},

	toggleSavePrompt: function(prompt) {
		var item = {
	      id: prompt.data.id,
	      prompt: prompt,
	      comments: {}
	    }
		reactNativeStore.model("prompts").then(function(db) {
			db.find({id:item.id})
			.then(function(promptData) {
				if(promptData.length > 0) {
					db.remove({id:item.id})
						.then(function(removedData) {
							PromptsActions.removePrompt(item.id);
						})
				} 
				else {
					RedditApi.getPromptComments(item.id)
					.then(function(commentData) {
						item.comments = commentData;
						item.prompt.isSaved = true;
						db.add(item)
          				.then(function(addedData) {
          					PromptsActions.savePrompt(item.prompt);
          				})
					})
				}
			})
		})
	},


	// Defining if user open the app for the first time
	updateIntroState: function() {
		reactNativeStore.model("intro").then(function(db) {
			db.find({seen: true})
			.then(function(data) {
				if(data.length === 0)  {
					db.add({seen: true})
					.then(function(dataAdded) {
						console.log('success');
					});
				}
			})
			
		});
	}
}

module.exports = LocalStorage;