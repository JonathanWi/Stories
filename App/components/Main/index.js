var React = require('react-native');
var styles = require('./styles.js');

var NavigationStore = require('../../stores/NavigationStore');

var Tabs = require('../Tabs');

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

  componentWillMount: function() {
    StatusBarIOS.setStyle(this.state.navigation.statusBar, true);
  },

   // Add change listeners to stores
  componentDidMount: function() {
    NavigationStore.addChangeListener(this._onChange);
  },

  componentWillUnMount: function() {
    NavigationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({navigation: NavigationStore.getNavigationSettings()});
    StatusBarIOS.setStyle(this.state.navigation.statusBar, true);
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
          component: Tabs,
          backButtonTitle: ' '
        }} 
      />
    )
  },

})

module.exports = Main;
