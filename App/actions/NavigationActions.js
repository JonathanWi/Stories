var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

// Define actions object 

var NavigationActions = {

	// Switch NavigatorIOS color
	switchNavColor: function(data) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SWITCH_NAV_COLOR,
			data: data
		})
	},

};

module.exports = NavigationActions;