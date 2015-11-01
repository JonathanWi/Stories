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
              <Text style={styles.author}>{this.state.author} in <Text style={[styles.flair, {color:this.state.type.color}]}>{this.state.type.name}</Text>
              </Text>
            </View>
            <Text style={styles.title}>
              {this.state.title}
            </Text>
            <View style={styles.stats}>
              <View style={styles.iconTextContainer}>
                <Text style={styles.icon}><Icon name="ios-chatbubble-outline" size={20} color='#999' /></Text>
                <Text style={styles.iconText}>{this.state.numComments}</Text>
              </View>
              <View style={styles.iconTextContainer}>
                <Text style={styles.icon}><Icon name="ios-arrow-thin-up" size={20} color='#999' /></Text>
                <Text style={styles.iconText}>{this.state.score}</Text>
              </View>
              <View style={styles.iconTextContainer}>
                <TouchableHighlight activeOpacity={0.5} underlayColor="#FFF" onPress={this.toggleSaved}>
                  <View style={{flex:0, flexDirection: 'row'}}>
                    <Text style={[styles.icon, {color: this.state.isSaved ? '#DDD' : '#AAA'}]}><Icon name={this.state.isSaved ? 'ios-bookmarks' : 'ios-bookmarks-outline'} size={20} color='#999'/></Text>
                    <Text style={styles.iconText}>{this.state.isSaved ? 'Saved' : 'Save'}</Text>
                  </View>
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
