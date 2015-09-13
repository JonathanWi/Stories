var React = require('react-native');
var styles = require('./styles.js');

var NavigationStore = require('../../stores/NavigationStore');
var NavigationActions = require('../../actions/NavigationActions');

var Prompts = require('../Prompts');

var Icon = require('react-native-vector-icons/Ionicons');


var {
  NavigatorIOS,
  StatusBarIOS
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      navigation: NavigationStore.getNavigationSettings()
    }
  },

   // Add change listeners to stores
  componentDidMount: function() {
    NavigationStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    NavigationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    StatusBarIOS.setStyle(this.state.navigation.statusBar, true);
    this.setState({navigation: NavigationStore.getNavigationSettings()});
  },

  render: function() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        translucent={false}
        shadowHidden={this.state.navigation.shadowHidden}
        tintColor={this.state.navigation.tintColor}
        barTintColor={this.state.navigation.barTintColor}
        titleTextColor={this.state.navigation.titleTextColor}
        initialRoute={{
          title: 'Stories',
          component: Prompts,
          backButtonTitle: ' '
        }} 
      />
    )
  }

})

module.exports = Main;
