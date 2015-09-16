var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');

var PromptStore = require('../../stores/PromptStore');

var RedditApi = require('../../utils/RedditApi');
var LocalStorage = require('../../utils/LocalStorage');

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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => true,
      }),
      prompts: {},
      loaded: false,
      loadMore: false
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCell}
        renderFooter={this.renderFooter}
        automaticallyAdjustContentInsets={false}
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
    var parsedType = item.data.title.split('[')[1].split(']')[0].toUpperCase().trim();
    if(parsedType.length > 2) {
      parsedType = parsedType.substring(0,2);
    }
    var type = types[parsedType];
    var title = item.data.title.replace(/ *\[[^\]]*]/, '').trim();
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item, type, title)}
        key={item.data.id}
        type={type}
        title={title}
        numComments = {item.data.num_comments}
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

  goToPrompt: function(item, type, title) {
    this.props.navigator.push({
      component: Comments,
      rightButtonIcon: this.state.saveIcon,
      backButtonTitle: ' ',
      title: type.name,
      onRightButtonPress: () => {LocalStorage.toggleSavePrompt(item)},
      backButtonIcon: this.state.backIcon,
      passProps: {
        item: item,
        promptId: item.data.id,
        title: title,
        type: type,
        author: item.data.author,
        selftext: item.data.selftext,
        saveIcon: this.state.saveIcon,
        fromSaved: this.state.feed === 'saved' ? true : false
      }
    })
  },

})

module.exports = Prompts;
