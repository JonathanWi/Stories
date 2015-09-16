var keyMirror = require('keymirror');

// Define action constants
AppConstants = keyMirror({
	GET_PROMPTS: null,		// Receive all prompts
	GET_COMMENTS: null,		// Get top comments from a prompt
	REFRESH_PROMPT: null,	// refresh prompt after pull to refresh
	SAVE_PROMPT: null,		// Save prompt to localstorage
	REMOVE_PROMPT: null,	// remove prompt from localstorage
	SWITCH_NAV_COLOR: null,	// Switch NavigatorIOS barTintColor 
});

module.exports = AppConstants;