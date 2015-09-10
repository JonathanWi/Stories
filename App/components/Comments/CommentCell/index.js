var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var CommentCell = React.createClass({
  getInitialState: function() {
    return {
      author: this.props.author,
      body: this.props.body,
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.author}>
            {this.state.author}
          </Text>
          <Text style={styles.body}>
            {this.state.body}
          </Text>
        </View>
        <View style={styles.separator}></View>
      </View>
            )
  }
})

module.exports = CommentCell;
