var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var PromptCell = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.title,
      type: this.props.type,
      author: this.props.author
    }
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {this.state.title}
            </Text>
            <Text style={styles.type}>
              <Text style={{fontWeight:'bold'}}>{this.state.author}</Text> | <Text style={{color:this.state.type.color}}>{this.state.type.name}</Text>
            </Text>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
            )
  }
})

module.exports = PromptCell;
