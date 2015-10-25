'use strict';

var React = require('react-native');
var styles = require('./styles');

var Tabs = require('./App/components/Tabs');
var Intro = require('./App/components/Intro');
var BackButton = require('./App/components/Buttons/Back');
var Router = require('gb-native-router');

var Icon = require('react-native-vector-icons/Ionicons');
var _ = require('./node_modules/react-native/node_modules/underscore');
var reactNativeStore = require('react-native-store');


var {
  AppRegistry,
  View,
  Navigator
} = React;

var Stories = React.createClass({

  getInitialState: function() {
    return {
      displayIntro: undefined
    }
  },

  componentWillMount: function() {
    var _this = this;
    reactNativeStore.model("intro").then(function(db) {
      db.find({seen: true})
      .then(function(data) {
        if(data.length > 0) {
          _this.setState({displayIntro: false})
        } else {
          _this.setState({displayIntro: true})
        }
      })
    });
  },

  render: function() {
    var firstRoute;
    while(this.state.displayIntro === undefined) {
      return (
        <View></View>
        )
    }
    if(this.state.displayIntro === true) {
      firstRoute = {
        name: '',
        component: Intro,
        trans: true
      };
    } else {
      firstRoute = {
        name: 'Stories',
        component: Tabs,
        trans: false
      };
    }
    return (
      <Router 
        firstRoute={firstRoute}
        backButtonComponent={BackButton}
        headerStyle={styles.header}
        titleStyle={styles.title} />
    );
  }

});

AppRegistry.registerComponent('Stories', () => Stories);
