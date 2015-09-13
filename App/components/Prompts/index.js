var React = require('react-native');
var styles = require('./styles.js');

var Comments = require('../Comments');
var PromptCell = require('./PromptCell');

var PromptStore = require('../../stores/PromptStore');

var RedditApi = require('../../utils/RedditApi');

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
  'FF' : { 'name' : 'Flash Fiction', 'color' : '#DA552F'}
}

var {
  View,
  ScrollView,
  ListView,
  ActivityIndicatorIOS
} = React;

RedditApi.getPromptsData();

var Prompts = React.createClass({

  getInitialState: function() {
    return {
      dataBlob: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
      prompts: PromptStore.getPrompts(),
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
    Icon.getImageSource('ios-arrow-thin-left', 30)
      .then((source) => {
        this.setState({ backIcon: source })
      });
  },

  componentDidMount: function() {
    PromptStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PromptStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var tempDataBlob = this.state.dataBlob;
    tempDataBlob[this.state.currentPage] = PromptStore.getPrompts();
    this.setState({
      currentPage: this.state.currentPage + 1,
      prompts: PromptStore.getPrompts(),
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
        onEndReached={this.pullMorePrompts.bind(this, this.state.prompts[this.state.prompts.length - 1].data.id)}
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
    var type = types[item.data.title.split('[')[1].split(']')[0].toUpperCase()];
    var title = item.data.title.replace(/ *\[[^\]]*]/, '').trim();
    return (
      <PromptCell
        onSelect={() => this.goToPrompt(item.data.id, type, title, item.data.author)}
        type={type}
        title={title}
        author={item.data.author} />
      )
  },

  pullMorePrompts: function(index) {
    this.setState({loadMore: true}); 
    RedditApi.getPromptsData(index);
  },

  goToPrompt: function(index, type, title, author) {
    this.props.navigator.push({
      component: Comments,
      rightButtonIcon: this.state.saveIcon,
      backButtonTitle: ' ',
      title: type.name,
      onRightButtonPress: this.savePrompt,
      backButtonIcon: this.state.backIcon,
      passProps: {
        promptId: index,
        title: title,
        type: type,
        author: author,
        saveIcon: this.state.saveIcon,
        lolilol: true
      }
    })
  },

  savePrompt: function() {
    alert('ok');
  }


})

module.exports = Prompts;
