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
      color: this.props.color,
    }
  },

  render: function() {
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
            <Text style={{color:this.state.color}}>{this.state.author} </Text><Text style={{color:'#AAA'}}> | {_estimatedTime} </Text>
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
