var React = require('react-native');
var styles = require('./styles.js');

var Prompts = require('../Prompts');

var Icon = require('react-native-vector-icons/Ionicons');


var {
  View,
  TabBarIOS,
  NavigatorIOS,
  Text
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      prompts: this.props.prompts,
    }
  },

  componentWillMount: function() {
    Icon.getImageSource('bookmark', 30)
      .then((source) => {
        this.setState({ backIcon: source })
      });
  },

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#DA552F'
        barTintColor='#FFF'
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
