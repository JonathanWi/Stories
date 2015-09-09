var React = require('react-native');
var styles = require('./styles.js');

var PromptsActions = require('../../actions/PromptsActions');

var {
  View,
  NavigatorIOS,
  Text,
  StatusBarIOS,
  Image,
  ScrollView,
  TouchableHighlight
} = React;

var Prompts = React.createClass({
  getInitialState: function() {
    return {
      prompts : this.props.prompts
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
        <View style={styles.row}>
            <Text style={styles.rowTitle}>Hello</Text>
        </View>
      )
  }

})

module.exports = Prompts;
