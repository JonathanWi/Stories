var React = require('react-native');
var styles = require('./styles.js');

var ScrollableTabView = require('react-native-scrollable-tab-view');

var Prompts = require('../Prompts');
var CustomTabBar = require('./TabBar');

var {
  NavigatorIOS,
  StatusBarIOS
} = React;

var Tabs = React.createClass({

  render: function() {
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
        <Prompts navigator={this.props.navigator} feed='popular' tabLabel="Popular" />
        <Prompts navigator={this.props.navigator} feed='top' tabLabel="Top" />
        <Prompts navigator={this.props.navigator} feed='new' tabLabel="New" />
      </ScrollableTabView>
    );
  }

})

module.exports = Tabs;
