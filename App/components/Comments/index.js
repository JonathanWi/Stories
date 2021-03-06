var React = require('react-native');
var styles = require('./styles.js');

var CommentStore = require('../../stores/CommentStore');

var CommentCell = require('./CommentCell');

var RedditApi = require('../../utils/RedditApi');
var LocalStorage = require('../../utils/LocalStorage');

var Lightbox = require('react-native-lightbox');
var Icon = require('react-native-vector-icons/Ionicons');
var Modal   = require('react-native-modalbox');
var Image = require('react-native-image-progress');

var {
  View,
  Text,
  TouchableHighlight,
  ListView,
  ScrollView,
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
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
        }),
      replies: {},
      comments: CommentStore.getComments(),
      loaded : false,
      fromSaved: this.props.fromSaved,
      isSaved: false,
      isPlaying: false,
      repliesRender: []
    };
  },

  componentDidMount: function () {
    var _this = this;
    CommentStore.addChangeListener(this._onChange);
    // Timeout in order to not pollute the transition with data rendering
    setTimeout(function() {
      if(_this.state.fromSaved) {
        LocalStorage.getPromptComments(_this.state.promptId)
      } else {
        RedditApi.getPromptComments(_this.state.promptId);
      }
    }, 400);
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      comments: CommentStore.getComments(),
      dataSource: this.state.dataSource.cloneWithRows(CommentStore.getComments()),
      loaded: true,
    });
    
  },


  render: function() {
      return (
        <View style={{flex: 1}}>
          <ListView
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
            dataSource={this.state.dataSource}
            renderRow={this.renderCell}
          /> 
          <Modal swipeArea={200} style={[styles.modal]} position={"bottom"} ref={"repliesModal"}>
            <ScrollView>
              {this.state.repliesRender}
            </ScrollView>
          </Modal>
        </View>
    );
  },

  renderHeader: function() {
    // If image prompts, display image in header
    var lightBox = [];
    if(this.state.type.name === 'Image Prompt') {
      // Extract Image URL from selftext
      var geturl = new RegExp(
        "((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
       ,"g"
      ),
      urls = this.state.selftext.match(geturl);
      lightBox.push(
        <View>
          <View style={[styles.stat, {opacity:.5, marginTop:15, marginBottom: 15}]}>
            <Text style={styles.icon}><Icon name="ios-search-strong" size={16} color="#FFF" /></Text>
            <Text style={styles.instructions}>Tap to zoom</Text>
          </View>
          <Lightbox navigator={this.props.navigator}>
            <Image 
              source={{ uri: urls[0] }}
              indicator='bar' 
              resizeMode="cover"
              style={styles.cover}/>
          </Lightbox>
        </View>
        );
    }
    return (
      <View style={{backgroundColor:this.state.type.color, marginTop: -20}}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.state.title}
          </Text>
          {lightBox}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.author}>
                — {this.state.author}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.icon}><Icon name="ios-chatbubble-outline" size={16} color="#FFF" /></Text>
              <Text style={styles.iconText}>{this.state.item.data.num_comments}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.icon}><Icon name="ios-arrow-thin-up" size={16} color="#FFF" /></Text>
              <Text style={styles.iconText}>{this.state.item.data.score}</Text>
            </View>
          </View>

        </View>
      </View>
    );
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
    var replies = {};
    var repliesRender = [];
    var numReplies = 0;
    if(item.data.replies) {
      replies = item.data.replies;
      var addReply = function(reply, repliesRender, level) {
        var comment = (
          <View key={reply.data.id} style={[styles.reply, {paddingLeft: 25 + (15 * level)}]}>
            <Text style={styles.replyAuthor}>{reply.data.author}</Text>
            <Text style={styles.replyBody}>{reply.data.body.trim()}</Text>
          </View>);
        repliesRender.push(comment);
        if(reply.data.replies) {
          for(var i = 0; i < reply.data.replies.data.children.length; i++) {
            addReply(reply.data.replies.data.children[i], repliesRender, level + 1);
          }
        }   
      }

      for(var i = 0; i < replies.data.children.length; i++) {
        addReply(replies.data.children[i], repliesRender, 0);
      }

      numReplies = repliesRender.length;
    } else {
      repliesRender.push(
        <View style={{alignItems: 'center',justifyContent: 'center',flex:1}}>
          <Icon name="ios-chatbubble-outline" style={{marginBottom:20}} size={50} color="#8C9CA9" />
          <Text style={{fontFamily: 'Avenir',color: '#8C9CA9', fontSize:18}}> There are no replies yet.</Text>
        </View>
        )
    }

    return (
      <CommentCell
        author={author}
        key={item.data.id}
        body={body}
        isPlaying={this.state.isPlaying}
        updateIsPlaying={this.updateIsPlaying}
        displayReplies={() => this.displayReplies(repliesRender)}
        repliesCount={numReplies}
        color={this.state.type.color} />
      )
  },

  updateIsPlaying: function() {
    // Update Playing state for all childs in order to
    // stop concurrent Text-to-Speech
    this.setState({isPlaying: false});
  },

  displayReplies: function(repliesRender) {
    this.refs.repliesModal.open();
    this.setState({
      repliesRender: repliesRender
    });
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
