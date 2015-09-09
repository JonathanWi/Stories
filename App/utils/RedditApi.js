var PromptsActions = require('../actions/PromptsActions');
var _ = require('../../node_modules/react-native/node_modules/underscore');

var RedditApi = {
	getPromptsData: function() {
		return fetch('https://api.reddit.com/r/WritingPrompts')
		.then(function(data) {
			var _data = JSON.parse(data._bodyInit);
			_data = _data.data.children;
			_data = _.filter(_data, function(item) {
				return item.data.stickied === false;
			})
			PromptsActions.getPrompts(_data);
		});
	}
}

module.exports = RedditApi;