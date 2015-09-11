var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');

var PromptsActions = require('../../actions/PromptsActions');

var Icon = require('react-native-vector-icons/Ionicons');

var types = {
  'WP' : { 'name' : 'Writing Prompts', 'color': '#802727'},
  'EU' : { 'name' : 'Established Univers', 'color' : '#E1AA79'},
  'CW' : { 'name' : 'Constrained Writing', 'color' : '#808027'},
  'TT' : { 'name' : 'Theme Thursday', 'color' : '#804F27'},
  'MP' : { 'name' : 'Media Prompt', 'color' : '#9CBD59'},
  'IP' : { 'name' : 'Image Prompt', 'color' : '#411D55'},
  'RF' : { 'name' : 'Reality Fiction', 'color' : '#174D4D'},
  'PM' : { 'name' : 'Prompt Me', 'color' : '#2F2258'},
  'PI' : { 'name' : 'Prompt Inspired', 'color' : '#807127'},
  'CC' : { 'name' : 'Constructive Criticism', 'color' : '#671F48'},
  'FF' : { 'name' : 'Flash Fiction', 'color' : '#DA552F'}
}

var {
  View,
  NavigatorIOS,
  Text,
  ScrollView,
  TouchableHighlight,
  ListView
} = React;

var Prompts = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      prompts : this.props.prompts,
      dataSource: ds.cloneWithRows(this.props.prompts)
    };
  },

  componentWillMount: function() {
    Icon.getImageSource('ios-bookmarks-outline', 30)
      .then((source) => {
        this.setState({ saveIcon: source })
      });
    Icon.getImageSource('ios-arrow-thin-left', 30)
      .then((source) => {
        this.setState({ backIcon: source })
      });
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCell}
      />
    );
  },

  renderCell: function(item) {
    var type = types[item.data.title.split('[')[1].split(']')[0]];
    var title = item.data.title.replace(/ *\[[^\]]*]/, '').trim();
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item.data.id, type, title, item.data.author)}
        type={type}
        title={title}
        author={item.data.author} />
      )
  },

  goToPrompt: function(index, type, title, author) {
    this.props.navigator.push({
      title: type.name,
      component: Comments,
      rightButtonIcon: this.state.saveIcon,
      backButtonTitle: ' ',
      onRightButtonPress: this.savePrompt,
      backButtonIcon: this.state.backIcon,
      passProps: {
        promptId: index,
        title: title,
        type: type,
        author: author,
        saveIcon: this.state.saveIcon
      }
    })
  },

  savePrompt: function() {
    alert('ok');
  }


})

module.exports = Prompts;
