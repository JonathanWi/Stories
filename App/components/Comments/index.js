var React = require('react-native');
var styles = require('./styles.js');

var PromptsActions = require('../../actions/PromptsActions');
var NavigationActions = require('../../actions/NavigationActions');
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
  ScrollView,
  AppStateIOS,
  ActivityIndicatorIOS
} = React;

var Comments = React.createClass({

  getInitialState: function() {
    return {
      promptId : this.props.promptId,
      title : this.props.title,
      type : this.props.type,
      author : this.props.author,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments : CommentStore.getComments(),
      loaded : false
    };
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this._onChange);
    RedditApi.getPromptComments(this.state.promptId);
    NavigationActions.switchNavColor({'barTintColor' : this.state.type.color, 'tintColor' : '#FFF', 'titleTextColor' : '#FFF', 'statusBar' : 1, 'shadowHidden' : true});
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(this._onChange);
    // NavigationActions.switchNavColor({'barTintColor' : '#FFFFFF', 'tintColor' : '#000000', 'titleTextColor' : '#000000', 'statusBar' : 1, 'shadowHidden' : false});
  },

  _onChange: function() {
    this.setState({'comments' : CommentStore.getComments(), 'loaded' : true});
    this.setState({'dataSource' : this.state.dataSource.cloneWithRows(this.state.comments)})
  },


  render: function() {
    return (
      <ListView
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        dataSource={this.state.dataSource}
        renderRow={this.renderCell}
      /> 
    );
  },

  renderHeader: function() {
    return (
      <View style={{backgroundColor:this.state.type.color}}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.state.title}
          </Text>
          <View style={{opacity:.5}}>
            <Text style={styles.author}>
              — {this.state.author}
            </Text>
          </View>
        </View>
      </View>
      )
  },

  renderFooter: function() {
    while (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
  },

  renderCell: function(item) {
    var author = item.data.author;
    var body = item.data.body.trim();
    return (
      <CommentCell
        author={author}
        body={body}
        color={this.state.type.color} />
      )
  },

  renderLoading: function() {
    return (
      <View style={{flex: 1,backgroundColor: '#FFFFFF',justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicatorIOS
            animating={!this.state.loaded}
            style={{alignItems: 'center',justifyContent: 'center',height: 80}}
            size="large" />
      </View>
      )
  }

})

module.exports = Comments;
