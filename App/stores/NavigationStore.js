var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('../../node_modules/react-native/node_modules/underscore');


// Define initial data points
var _navigationSettings = {'barTintColor' : '#FFFFFF', 'tintColor' : '#000000', 'titleTextColor' : '#000000', 'statusBar' : 1, 'shadowHidden' : false};

// Method to load comments from reddit API
function setNavigation(data) {
  _navigationSettings = data;
}

// Extend NavigationStore with EventEmitter to add eventing capabilities
var NavigationStore = _.extend({}, EventEmitter.prototype, {

  // Return color
  getNavigationSettings: function() {
    return _navigationSettings;
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
    
    // Respond to SWITCH_NAV_COLOR action
    case AppConstants.SWITCH_NAV_COLOR:
      setNavigation(action.data);
      break;

    default:
      return true;

  }

  // If action was responded to, emit change event
  NavigationStore.emitChange();

  return true;

});

module.exports = NavigationStore;