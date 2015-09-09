var React = require('react-native');
var styles = require('./styles.js');

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
  StatusBarIOS,
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

  componentWillMount: function() {
    this.hideStatusBar();
  },

  hideStatusBar: function() {
    StatusBarIOS.setHidden(true);
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
    var type = item.data.title.substring(1, 3).toUpperCase();
    var title = item.data.title.substring(5)
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.type}>
              {types[type].toUpperCase()}
            </Text>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }


})

module.exports = Prompts;
