var React = require('react-native');

var styles = require('./styles');

var Icon = require('react-native-vector-icons/Ionicons');
var _ = require('../../../../node_modules/react-native/node_modules/underscore');

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
      repliesCount: this.props.repliesCount,
      color: this.props.color,
    }
  },

  render: function() {

    // Estimated time read
    var _words = this.state.body.split(' ').length;
    var _estimatedSeconds = Math.floor(_words / 3);
    if(_estimatedSeconds < 60) {
      var _estimatedTime = 'Under a minute read';
    } else {
      var _estimatedTime = '';
      var _minutes = Math.floor(_estimatedSeconds / 60);
      var _seconds = _estimatedSeconds - (_minutes * 60);
      if(_seconds < 30) {
        _estimatedTime += _minutes + ' min';
      } else {
        _minutes = _minutes + 1;
         _estimatedTime += _minutes + ' min';
      }
      _estimatedTime += ' read';
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.author}>
            <Text style={{color:this.state.color}}>{this.state.author} </Text><Text style={{color:'#8C9CA9'}}> | {_estimatedTime} </Text>
          </Text>
          <Text style={styles.body}>
            {this.state.body}
          </Text>
        </View>
        <View style={{flex: 1, marginBottom:25}}>
          <TouchableHighlight activeOpacity={0.5} underlayColor="#FFF" onPress={this.props.displayReplies}>
            <Icon name="reply" style={styles.iconReply} size={20} color="#8C9CA9">
              <Text style={styles.textReply}>{this.state.repliesCount} Replies</Text>
            </Icon>
          </TouchableHighlight>
        </View>
        <View style={styles.separator}></View>
      </View>
            )
  },
})

module.exports = CommentCell;
