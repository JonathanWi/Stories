var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('react-native-vector-icons/Ionicons');

var {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
} = React;

var BackButton = React.createClass({

  render: function() {
    return (
      <Icon name="ios-arrow-thin-left" style={styles.button} />
    )
  }
  

})

module.exports = BackButton;
