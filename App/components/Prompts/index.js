var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');

var PromptStore = require('../../stores/PromptStore');

var RedditApi = require('../../utils/RedditApi');

var Icon = require('react-native-vector-icons/Ionicons');
var reactNativeStore = require('react-native-store');

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
  ActivityIndicatorIOS
} = React;

var Prompts = React.createClass({

  getInitialState: function() {
    return {
      feed: this.props.feed,
      dataBlob: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
      prompts: {},
      currentPage: 0,
      loaded: false,
      loadMore: false
    };
  },

  componentWillMount: function() {
    Icon.getImageSource('ios-bookmarks-outline', 30)
      .then((source) => {
        this.setState({ saveIcon: source })
      });
    if(this.state.feed === 'saved') {
      var _this = this;
      reactNativeStore.model("prompts").then(function(db) {
        db.find().then(function(data) {
          var _prompts = [];
          for (var i = 0; i < data.length; i++) {
            _prompts[i] = data[i].prompt;
          };
          _prompts = _prompts.reverse();
          var tempDataBlob = _this.state.dataBlob;
          tempDataBlob[_this.state.currentPage] = _prompts;

          _this.setState({
            currentPage: _this.state.currentPage + 1,
            prompts: _prompts,
            dataBlob: tempDataBlob,
            dataSource: _this.state.dataSource.cloneWithRowsAndSections(_this.state.dataBlob),
            loaded: true,
            loadMore: false
          });
        })
      });
    }
  },

  componentDidMount: function() {
    if(this.state.feed !== 'saved') {
      RedditApi.getPromptsData(this.state.feed, null);
    }
    PromptStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PromptStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var tempDataBlob = this.state.dataBlob;
    tempDataBlob[this.state.currentPage] = PromptStore.getPrompts(this.state.feed);
    this.setState({
      currentPage: this.state.currentPage + 1,
      prompts: PromptStore.getPrompts(this.state.feed),
      dataBlob: tempDataBlob,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob),
      loaded: true,
      loadMore: false
    });
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
        renderFooter={this.renderFooter}
        onEndReached={this.state.feed !== 'saved' ? this.pullMorePrompts.bind(this, this.state.prompts[this.state.prompts.length - 1].data.id) : null}
      />
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
    var parsedType = item.data.title.split('[')[1].split(']')[0].toUpperCase();
    if(parsedType.length > 2) {
      parsedType = parsedType.substring(0,2);
    }
    var type = types[parsedType];
    var title = item.data.title.replace(/ *\[[^\]]*]/, '').trim();
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item, type, title)}
        type={type}
        title={title}
        numComments = {item.data.num_comments}
        author={item.data.author} />
      )
    
  },

  pullMorePrompts: function(index) {
    if(this.state.feed !== 'saved') {
      this.setState({loadMore: true}); 
      RedditApi.getPromptsData(this.state.feed, index);
    }
  },

  goToPrompt: function(item, type, title) {
    this.props.navigator.push({
      component: Comments,
      rightButtonIcon: this.state.saveIcon,
      backButtonTitle: ' ',
      title: type.name,
      onRightButtonPress: () => { this._resultsView && this._resultsView.savePrompt(); },
      backButtonIcon: this.state.backIcon,
      passProps: {
        item: item,
        promptId: item.data.id,
        title: title,
        type: type,
        author: item.data.author,
        selftext: item.data.selftext,
        saveIcon: this.state.saveIcon,
        ref: this.onResultsRef,
        fromSaved: this.state.feed === 'saved' ? true : false
      }
    })
  },

  onResultsRef(resultsViewRef) {
    this._resultsView = resultsViewRef;
  }

})

module.exports = Prompts;
