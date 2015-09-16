var React = require('react-native');
var styles = require('./styles.js');

var CommentStore = require('../../stores/CommentStore');

var NavigationActions = require('../../actions/NavigationActions');

var CommentCell = require('./CommentCell');

var RedditApi = require('../../utils/RedditApi');
var LocalStorage = require('../../utils/LocalStorage');

var Lightbox = require('react-native-lightbox');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  View,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  ListView,
  Image,
  ScrollView,
  AppStateIOS,
  TouchableOpacity,
  ActivityIndicatorIOS
} = React;

var Comments = React.createClass({

  getInitialState: function() {
    return {
      item : this.props.item,
      promptId : this.props.promptId,
      title : this.props.title,
      type : this.props.type,
      author : this.props.author,
      selftext: this.props.selftext,
      dataBlob: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
      comments: CommentStore.getComments(),
      loaded : false,
      fromSaved: this.props.fromSaved,
      isSaved: false
    };
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this._onChange);
    NavigationActions.switchNavColor({'barTintColor' : this.state.type.color, 'tintColor' : '#FFF', 'titleTextColor' : '#FFF', 'statusBar' : 1, 'shadowHidden' : true});
    if(this.state.fromSaved) {
      LocalStorage.getPromptComments(this.state.promptId)
    } else {
      RedditApi.getPromptComments(this.state.promptId);
    }
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var tempDataBlob = this.state.dataBlob;
    tempDataBlob[0] = CommentStore.getComments();
    this.setState({
      currentPage: this.state.currentPage + 1,
      comments: CommentStore.getComments(),
      dataBlob: tempDataBlob,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob),
      loaded: true,
    });
  },


  render: function() {
    return (
        <ScrollView style={{position:'relative'}}>
          <ListView
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
            dataSource={this.state.dataSource}
            renderRow={this.renderCell}
          /> 
        </ScrollView>
    );
  },

  renderHeader: function() {
    // If image prompts, display image in header
    if(this.state.type.name === 'Image Prompt') {
      // Extract Image URL from selftext
      var geturl = new RegExp(
        "((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
       ,"g"
      ),
      urls = this.state.selftext.match(geturl);
      console.log(urls);
      return (
        <View style={{backgroundColor:this.state.type.color}}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {this.state.title}
            </Text>
            <View style={{opacity:.5}}>
              <Icon name="ios-search-strong" style={styles.magnify}>
                <Text style={styles.instructions}>Tap to zoom</Text>
              </Icon>
            </View>
            <Lightbox>
              <Image
                style={styles.cover}
                resizeMode="cover"
                source={{ uri: urls[0] }}
              />
            </Lightbox>
            <View style={{opacity:.5}}>
              <Text style={styles.author}>
                — {this.state.author}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    else {
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
      );
    }
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
