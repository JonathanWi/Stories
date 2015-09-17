var React = require('react-native');
var styles = require('./styles');

var Icon = require('react-native-vector-icons/Ionicons');
var LocalStorage = require('../../../utils/LocalStorage');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var PromptCell = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.title,
      type: this.props.type,
      author: this.props.author,
      numComments: this.props.numComments,
      score: this.props.score,
      item: this.props.item,
      isSaved: this.props.isSaved
    }
  },

  toggleSaved: function() {
    LocalStorage.toggleSavePrompt(this.state.item);
    this.setState({isSaved: !this.state.isSaved});
  },

  render: function() {
    return (
      <TouchableHighlight activeOpacity={0.5} underlayColor="#FFF" onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={styles.type}>
              <Text style={styles.author}>{this.state.author} | <Text style={[styles.flair, {color:this.state.type.color}]}>{this.state.type.name.toUpperCase()}</Text>
              </Text>
            </View>
            <Text style={styles.title}>
              {this.state.title}
            </Text>
            <View style={styles.stats}>
              <View style={{flex: 0, marginRight: 15}}>
                <Icon name="ios-chatbubble-outline" style={styles.icon} size={20} color="#999">
                  <Text style={styles.iconText}>{this.state.numComments}</Text>
                </Icon>
              </View>
              <View style={{flex: 0, marginRight: 15}}>
                <Icon name="ios-arrow-thin-up" style={styles.icon} size={20} color="#999">
                  <Text style={styles.iconText}>{this.state.score}</Text>
                </Icon>
              </View>
              <View style={{flex: 0, marginRight: 15}}>
                <TouchableHighlight activeOpacity={0.5} underlayColor="#FFF" onPress={this.toggleSaved}>
                  <Icon name={this.state.isSaved ? 'ios-bookmarks' : 'ios-bookmarks-outline'} style={styles.icon} size={20} color={this.state.isSaved ? '#DDD' : '#AAA'}>
                    <Text style={styles.iconText}>{this.state.isSaved ? 'Saved' : 'Unsaved'}</Text>
                  </Icon>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
            )
  }
})

module.exports = PromptCell;
