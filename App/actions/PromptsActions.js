var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

// Define actions object 

var PromptsActions = {

	// Receive all prompts
	getPrompts: function(data, feed) {
		AppDispatcher.handleAction({
			actionType: AppConstants.GET_PROMPTS,
			data: data,
			feed: feed
		})
	},

	// Get top comments from a prompt
	getComments: function(data) {
		AppDispatcher.handleAction({
			actionType: AppConstants.GET_COMMENTS,
			data: data
		})
	},

	// Save prompt to localStorage
	savePrompt: function(data) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SAVE_PROMPT,
			data: data
		})
	},

	// remove prompt from localStorage
	removePrompt: function(index) {
		AppDispatcher.handleAction({
			actionType: AppConstants.REMOVE_PROMPT,
			index: index
		})
	},

};

module.exports = PromptsActions;