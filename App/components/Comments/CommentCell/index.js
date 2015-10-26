var React = require('react-native');

var styles = require('./styles');

var Icon = require('react-native-vector-icons/Ionicons');
var _ = require('../../../../node_modules/react-native/node_modules/underscore');
var Speech = require('react-native-speech');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var CommentCell = React.createClass({
  getInitialState: function() {
    return {
      author: this.props.author,
      body: this.props.body,
      repliesCount: this.props.repliesCount,
      color: this.props.color,
      isPlaying: this.props.isPlaying
    }
  },

  componentWillReceiveProps: function() {
    // When clicking on a new comment to read, updated
    // all other comments reading state.
    this.setState({isPlaying: false});
  },

  componentWillUnmount: function() {
    Speech.stop();
  },

  _readComment: function() {
    var _this = this;
    Speech.isSpeaking()
      .then(function(speaking) {
        if(_this.state.isPlaying) {
          Speech.stop();
          _this.setState({isPlaying: false})
        } else {
          Speech.stop();
          Speech.speak({
            text: _this.state.body,
            voice: 'en-US'
          });
          _this.setState({isPlaying: true})
        }
      }, function(error) {
        Speech.stop();
        if(_this.state.isPlaying) {
           _this.setState({isPlaying: false})
        } else {
          _this.props.updateIsPlaying();
          _this.setState({isPlaying: true})
          Speech.speak({
              text: _this.state.body,
              voice: 'en-US'
            });
        }

      })
    
  },

  render: function() {

    // Estimated time read
    var _words = this.state.body.split(' ').length;
    var _estimatedSeconds = Math.floor(_words / 3);
    if(_estimatedSeconds < 60) {
      var _estimatedTime = '1 min read';
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
    var body = '';
    if(this.state.body) {
       body = this.state.body.replace(/[\r\n]+/g, '\n\n');
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <View style={{flex:2}}>
              <Text style={styles.author}>
                <Text style={{color:this.state.color}}>{this.state.author} </Text><Text style={{color:'#8C9CA9'}}> | {_estimatedTime} </Text>
              </Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end', marginTop: 3}}>
              <TouchableHighlight activeOpacity={0.5} underlayColor="#FFF" onPress={this._readComment}>
                <Icon name={this.state.isPlaying ? 'ios-pause' : 'ios-play'} style={styles.iconReply} size={16} color={this.state.isPlaying ? '#000' : '#8C9CA9'}>
                  <Text style={[styles.textSpeech, {color : this.state.isPlaying ? '#000' : '#8C9CA9'}]}>
                    {this.state.isPlaying ? 'Stop' : 'Read'}
                  </Text>
                </Icon>
              </TouchableHighlight>
            </View>
          </View>
          <Text style={styles.body}>
            {body}
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
