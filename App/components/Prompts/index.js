var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');
var SaveButton = require('../Buttons/Save');

var PromptStore = require('../../stores/PromptStore');

var RedditApi = require('../../utils/RedditApi');
var LocalStorage = require('../../utils/LocalStorage');

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
  'FF' : { 'name' : 'Flash Fiction', 'color' : '#DA552F'},
  'OT' : { 'name' : 'Off Topic', 'color' : '#671F48' }
}

var {
  View,
  ScrollView,
  ListView,
  Text,
  ActivityIndicatorIOS
} = React;

var Prompts = React.createClass({

  getInitialState: function() {
    return {
      feed: this.props.feed,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => true,
      }),
      prompts: {},
      loaded: false,
      loadMore: false,
      pullToRefresh: false
    };
  },

  componentWillMount: function() {
    Icon.getImageSource('ios-bookmarks-outline', 30)
      .then((source) => {
        this.setState({ saveIcon: source })
      });
  },

  componentDidMount: function() {
    if(this.state.feed !== 'saved') {
      RedditApi.getPromptsData(this.state.feed, null);
    } else {
      LocalStorage.getPrompts();
    }
    PromptStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PromptStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      prompts: PromptStore.getPrompts(this.state.feed),
      dataSource: this.getDataSource(PromptStore.getPrompts(this.state.feed)),
      loaded: true,
      loadMore: false
    });
  },

  getDataSource: function(prompts): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(prompts);
  },

  render: function() {
    while (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
    return (
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCell}
          renderFooter={this.renderFooter}
          renderHeader={this.renderHeader}
          automaticallyAdjustContentInsets={false}
          onEndReached={this.state.feed !== 'saved' ? this.pullMorePrompts.bind(this, this.state.prompts[this.state.prompts.length - 1].data.id) : null}
        />
      </View>
    );
  },

  renderLoading: function() {
    return (
      <ScrollView>
        <View style={{flex: 1,backgroundColor: '#FFFFFF',justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicatorIOS
            animating={!this.state.loaded}
            style={{alignItems: 'center',justifyContent: 'center',height: 80}}
            size="large" />
        </View>
      </ScrollView>
      )
  },

  renderHeader: function() {
    if(this.state.feed === 'saved') {
      if(this.state.loaded) {
        if(this.state.prompts.length === 0) {
          return(
            <View style={{flex: 1,backgroundColor: '#FFFFFF',justifyContent: 'center',alignItems: 'center', 'marginTop' : 30}}>
              <Icon name="ios-bookmarks-outline" size={60} color="#8C9CA9" />
              <Text style={{color:'#8C9CA9', textAlign:'center', fontSize:18, fontFamily: 'Avenir'}}>You have no saved prompts yet</Text>
            </View>
            )
        }
      }
    }
  },

  renderFooter: function() {
    while (this.state.loadMore) {
      return (
        <View style={{flex: 1,backgroundColor: '#FFFFFF',justifyContent: 'center',alignItems: 'center', 'marginTop' : 30}}>
          <ActivityIndicatorIOS
            animating={true}
            size={'large'} />
        </View>
        )
    }
  },

  renderCell: function(item) {
    var parsedType = item.data.link_flair_text.split(' ').map(function (s) { return s.charAt(0); }).join('').toUpperCase();
    var type = types[parsedType];
    var title = item.data.title.replace(/ *\[[^\]]*]/, '').trim();
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item, type, title)}
        key={item.data.id}
        type={type}
        title={title}
        item={item}
        isSaved = {item.isSaved}
        numComments = {item.data.num_comments}
        score = {item.data.score}
        author={item.data.author} />
      )
    
  },

  pullMorePrompts: function(index) {
    if(this.state.feed !== 'saved') {
      if(!this.state.loadMore) {
        RedditApi.getPromptsData(this.state.feed, index);
        this.setState({loadMore: true});
      }
    }
  },

  onRefresh: function() {
    if(this.state.feed == 'saved') {
      return true;
    }
    if(!this.state.pullToRefresh) {
      this.setState({pullToRefresh: true});
      var _this = this;
      RedditApi.refreshPromptsData(this.state.feed, this.state.prompts[0].data.id).then(function() {
        _this.setState({pullToRefresh: false});
      })
      
    }
  },

  goToPrompt: function(item, type, title) {
    this.props.toRoute({
      component: Comments,
      name: type.name,
      headerStyle: {backgroundColor : type.color},
      rightCorner: SaveButton,
      rightCornerProps: {
        isSaved: item.isSaved,
        toggleSave: () => {LocalStorage.toggleSavePrompt(item)}
      },
      passProps: {
        item: item,
        promptId: item.data.id,
        title: title,
        type: type,
        author: item.data.author,
        selftext: item.data.selftext,
        fromSaved: this.state.feed === 'saved' ? true : false
      }
    })
  },

})

module.exports = Prompts;
