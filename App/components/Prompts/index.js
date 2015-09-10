var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');

var PromptsActions = require('../../actions/PromptsActions');

var types = {
  'WP' : 'Writing Prompts',
  'EU' : 'Established Univers',
  'CW' : 'Constrained Writing',
  'TT' : 'Theme Thursday',
  'MP' : 'Media Prompt',
  'IP' : 'Image Prompt',
  'RF' : 'Reality Fiction',
  'PM' : 'Prompt Me',
  'PI' : 'Prompt Inspired',
  'CC' : 'Constructive Criticism'
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
      dataSource: ds.cloneWithRows(this.props.prompts),
    };
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
    var type = types[item.data.title.substring(1, 3).toUpperCase()];
    var title = item.data.title.substring(5);
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item.data.id, type)}
        type={type.toUpperCase()}
        title={title} />
      )
  },

  goToPrompt: function(index, type) {
    this.props.navigator.push({
      title: type,
      component: Comments,
      backButtonTitle: '',
      passProps: {
        promptId: index}
    })
  }


})

module.exports = Prompts;
