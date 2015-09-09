var React = require('react-native');
var styles = require('./styles.js');

var {
  View,
  Image,
  ActivityIndicatorIOS
} = React;

var Loading = React.createClass({
  getInitialState: function() {
    return {
      loaded: this.props.loaded
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          style={styles.centering}
          size="large" />
      </View>
      )
  }
})

module.exports = Loading;
