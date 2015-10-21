'use strict';

var React = require('react-native');
var styles = require('./styles');

var Tabs = require('./App/components/Tabs');
var Router = require('gb-native-router');

var _ = require('./node_modules/react-native/node_modules/underscore');


var {
  AppRegistry,
  View,
  Navigator
} = React;

var firstRoute = {
  name: 'Stories',
  component: Tabs
};

var Stories = React.createClass({

  render: function() {
    return (
      <Router 
        firstRoute={firstRoute}
        headerStyle={styles.header}
        titleStyle={styles.title} />
    );
  },

  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator} />
      </View>
      )
  },

  renderNavigation: function() {
    return (
      <Navigator
          sceneStyle={styles.container}
          ref={(navigator) => { this.navigator = navigator; }}
          renderScene={this.renderScene}
          navigationBarHidden={true}
          onBack={this.resetNavigationSettings}
          initialRoute={{
            name: 'Stories',
            component: Navigation
          }} />
    )
  }

});

AppRegistry.registerComponent('Stories', () => Stories);
