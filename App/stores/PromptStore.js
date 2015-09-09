var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('../../node_modules/react-native/node_modules/underscore');


// Define initial data points
var _prompts = {}, _selectedPrompt = {};

// Method to load prompts from reddit API
function loadPrompts(data) {
  _prompts = data[0];
}

// Set selected prompt
function selectPrompt(index) {
  _selectedPrompt = _prompts[index];
}

// Extend PromptStore with EventEmitter to add eventing capabilities
var PromptStore = _.extend({}, EventEmitter.prototype, {

  // Return product data
  getPrompts: function() {
    return _prompts;
  },

  // Return selected product
  getSelected: function() {
    return _selectedPrompt;
  },

  // Emit Change Event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removelListener('change', callback);
  }
});


// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    
    // Respond to GET_PROMPTS action
    case AppConstants.GET_PROMPTS:
      loadPrompts(action.data);
      break;

    // Respond to GET_COMMENTS action
    case AppConstants.GET_COMMENTS:
      selectPrompt(action.index);
      break;

    default:
      return true;

  }

  // If action was responded to, emit change event
  PromptStore.emitChange();

  return true;

});

module.exports = PromptStore;