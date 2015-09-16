var PromptsActions = require('../actions/PromptsActions');
var _ = require('../../node_modules/react-native/node_modules/underscore');

var RedditApi = {
	getPromptsData: function(feed, index) {
		index = typeof index !== 'undefined' ? index : null;
		var url = 'https://api.reddit.com/r/WritingPrompts';
		// Defining which feed to pull data from
		if(feed === 'top') {
			url += '/top'
		}

		// Check index to start from when loading more data
		if(index) {
			url += '?limit=25&after=t3_' + index;
		}

		return fetch(url)
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data.data.children;
			_data = _.filter(_data, function(item) {
				return item.data.stickied === false;
			})
			PromptsActions.getPrompts(_data, feed);
		});
	},

	refreshPromptsData: function(feed, index) {
		var url = 'https://api.reddit.com/r/WritingPrompts';

		// Defining which feed to pull data from
		if(feed === 'top') {
			console.log('is top !');
			url += '/top'
		}

		url += '?limit=25&before=t3_' + index;

		return fetch(url)
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data.data.children;
			_data = _.filter(_data, function(item) {
				return item.data.stickied === false;
			})
			PromptsActions.pullToRefresh(_data, feed);
			return _data;
		});
	},

	getPromptComments: function(index) {
		return fetch('https://api.reddit.com/r/WritingPrompts/comments/'+ index +'.json?depth=1')
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data[1].data.children;
			PromptsActions.getComments(_data);
			return _data;
		});
	}
}

module.exports = RedditApi;