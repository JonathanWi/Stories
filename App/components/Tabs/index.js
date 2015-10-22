var React = require('react-native');
var styles = require('./styles.js');

var ScrollableTabView = require('react-native-scrollable-tab-view');

var Prompts = require('../Prompts');
var CustomTabBar = require('./TabBar');

var {
  NavigatorIOS
} = React;

var Tabs = React.createClass({

  render: function() {
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
        <Prompts toRoute={this.props.toRoute} feed='popular' tabLabel="Popular" />
        <Prompts toRoute={this.props.toRoute} feed='top' tabLabel="Top" />
        <Prompts toRoute={this.props.toRoute} feed='saved' tabLabel="Saved" />
      </ScrollableTabView>
    );
  }

})

module.exports = Tabs;
