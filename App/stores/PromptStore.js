var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('../../node_modules/react-native/node_modules/underscore');


// Define initial data points
var _prompts = {};

// Method to load prompts from reddit API
function loadPrompts(data, feed) {
  if(!_prompts[feed]) {
    _prompts[feed] = data;  
  } else {
    for (var i = 0; i < data.length; i++) {
      _prompts[feed].push(data[i])
    };
  }
}

function prependPrompts(data, feed) {
  data.reverse();
  for (var i = 0; i < data.length; i++) {
    _prompts[feed].unshift(data[i])
  };
}

function savePrompt(data) {
  _prompts['saved'].unshift(data);
}

function removePrompt(index) {
  var arrIndex;
  _.find(_prompts['saved'], function(prompt, promptArrIndex) {
    if(prompt.data.id === index) {
      arrIndex = promptArrIndex;
    }
  });
  if (arrIndex > -1) {
      _prompts['saved'].splice(arrIndex, 1);
  }
  
}

// Extend PromptStore with EventEmitter to add eventing capabilities
var PromptStore = _.extend({}, EventEmitter.prototype, {

  // Return prompts
  getPrompts: function(feed) {
    return _prompts[feed];
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
    this.removeListener('change', callback);
  }
});


// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    
    // Respond to GET_PROMPTS action
    case AppConstants.GET_PROMPTS:
      loadPrompts(action.data, action.feed);
      break;

    case AppConstants.REFRESJ_PROMPT:
      prependPrompts(action.data, action.feed);
      break;

    case AppConstants.SAVE_PROMPT:
      savePrompt(action.data);
      break;

    case AppConstants.REMOVE_PROMPT:
      removePrompt(action.index);
      break;

    default:
      return true;

  }

  // If action was responded to, emit change event
  PromptStore.emitChange();

  return true;

});

module.exports = PromptStore;