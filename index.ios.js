'use strict';

var React = require('react-native');
var styles = require('./styles');

var Loading = require('./App/components/Loading');
var Prompts = require('./App/components/Prompts');

var PromptStore = require('./App/stores/PromptStore');

var _ = require('./node_modules/react-native/node_modules/underscore');

var RedditApi = require('./App/utils/RedditApi');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AppStateIOS,
  Navigator
} = React;


RedditApi.getPromptsData();

// Method to retrieve state from Stores
function getAppState() {
  return {
    loaded : false,
    prompts: PromptStore.getPrompts()
  };
}

var Stories = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    PromptStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    PromptStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAppState());
    this.setState({'loaded' : true});
  },
  
  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator}
          prompts={this.state.prompts} />
      </View>
      )
  },

  render: function() {

    while (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
    
    return (
      this.renderPrompts()
    );
  
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  },

  renderPrompts: function() {
    return (
      <Navigator
          sceneStyle={styles.container}
          ref={(navigator) => { this.navigator = navigator; }}
          renderScene={this.renderScene}
          tintColor='#DA552F'
          barTintColor='#FFFFFD'
          titleTextColor='#DA552F'
          navigationBarHidden={true}
          initialRoute={{
            title: 'Prompts',
            component: Prompts,
          }} />
    )
  }

});

AppRegistry.registerComponent('Stories', () => Stories);
