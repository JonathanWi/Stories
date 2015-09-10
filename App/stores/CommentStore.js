var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('../../node_modules/react-native/node_modules/underscore');


// Define initial data points
var _comments = {};

// Method to load comments from reddit API
function loadComments(data) {
  _comments = data;
}

// Extend CommentStore with EventEmitter to add eventing capabilities
var CommentStore = _.extend({}, EventEmitter.prototype, {

  // Return comments
  getComments: function() {
    return _comments;
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
    
    // Respond to GET_COMMENTS action
    case AppConstants.GET_COMMENTS:
      loadComments(action.data);
      break;

    default:
      return true;

  }

  // If action was responded to, emit change event
  CommentStore.emitChange();

  return true;

});

module.exports = CommentStore;