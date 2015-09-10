var React = require('react-native');
var styles = require('./styles.js');

var PromptsActions = require('../../actions/PromptsActions');
var CommentStore = require('../../stores/CommentStore');

var Loading = require('../Loading');
var CommentCell = require('./CommentCell');

var RedditApi = require('../../utils/RedditApi');


var {
  View,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  ListView,
  AppStateIOS
} = React;


var Comments = React.createClass({

  getInitialState: function() {
    return {
      promptId : this.props.promptId,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments : CommentStore.getComments(),
      loaded : false
    };
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this._onChange);
    RedditApi.getPromptComments(this.state.promptId);
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({'comments' : CommentStore.getComments(), 'loaded' : true});
    this.setState({'dataSource' : this.state.dataSource.cloneWithRows(this.state.comments)})
  },


  render: function() {
    while (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCell}
      />
    );
  },

  renderCell: function(item) {
    var author = item.data.author;
    var body = item.data.body;
    return (
      <CommentCell
        author={author}
        body={body} />
      )
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  },

})

module.exports = Comments;
