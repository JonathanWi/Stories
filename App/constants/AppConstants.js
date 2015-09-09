var keyMirror = require('keymirror');

// Define action constants
AppConstants = keyMirror({
	GET_PROMPTS: null,		// Receive all prompts
	GET_COMMENTS: null,		// Get top comments from a prompt
	SAVE_PROMPT: null,		// Save prompt to localstorage
});

module.exports = AppConstants;