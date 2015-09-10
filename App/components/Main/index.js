var React = require('react-native');
var styles = require('./styles.js');

var Prompts = require('../Prompts');

// var Icon = require('Foundation');


var {
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      prompts: this.props.prompts,
    }
  },

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#DA552F'
        barTintColor='#FFFFFD'
        titleTextColor='#DA552F'
        initialRoute={{
          title: 'Stories',
          component: Prompts,
          passProps: {
            prompts: this.state.prompts,
          }
        }} 
      />
    )
  }

})

module.exports = Main;
