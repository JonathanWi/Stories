var PromptsActions = require('../actions/PromptsActions');
var _ = require('../../node_modules/react-native/node_modules/underscore');

var RedditApi = {
	getPromptsData: function(index) {
		index = typeof index !== 'undefined' ? index : null;
		var url = 'https://api.reddit.com/r/WritingPrompts?limit=25';
		if(index) {
			url += '&after=t3_' + index;
		}
		return fetch(url)
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data.data.children;
			_data = _.filter(_data, function(item) {
				return item.data.stickied === false;
			})
			PromptsActions.getPrompts(_data);
		});
	},

	getPromptComments: function(index) {
		return fetch('https://api.reddit.com/r/WritingPrompts/comments/'+ index +'.json?depth=1')
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data[1].data.children;
			PromptsActions.getComments(_data);
		});
	}
}

module.exports = RedditApi;