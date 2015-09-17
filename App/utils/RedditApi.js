var PromptsActions = require('../actions/PromptsActions');
var _ = require('../../node_modules/react-native/node_modules/underscore');
var reactNativeStore = require('react-native-store');

// Create array with saved prompts id
var savedPrompts = [];

reactNativeStore.model("prompts")
.then(function(db) {
	db.find()
	.then(function(data) {
		for (var i = 0; i < data.length; i++) {
			savedPrompts.push(data[i].id);
		};
	});
});

var RedditApi = {
	getPromptsData: function(feed, index) {
		index = typeof index !== 'undefined' ? index : null;
		var url = 'https://api.reddit.com/r/WritingPrompts';
		var _this = this;

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
			_data = _this.filterData(_data);
			PromptsActions.getPrompts(_data, feed);
		});
	},

	refreshPromptsData: function(feed, index) {
		var url = 'https://api.reddit.com/r/WritingPrompts';
		var _this = this;

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
			_data = _this.filterData(_data);
			PromptsActions.pullToRefresh(_data, feed);
			return _data;
		});
	},

	filterData: function(data) {
		for(var i = 0; i < data.length; i++) {
			if(_.contains(savedPrompts, data[i].data.id)) {
				data[i].isSaved = true;
			} else {
				data[i].isSaved = false;
			}
		}
		data = _.filter(data, function(item) {
			return item.data.stickied === false;
		});
		return data;
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