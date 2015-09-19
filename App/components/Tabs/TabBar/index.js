var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  TouchableOpacity,
} = React;

var deviceWidth = require('Dimensions').get('window').width;
var precomputeStyle = require('precomputeStyle');
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

var CustomTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption: function(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity style={{flex:1}} key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab]}>
          <Text 
            style={{
              color: isTabActive ? '#000' : '#8C9CA9', 
              fontWeight: isTabActive ? 'bold' : 'normal',
              fontSize:13,
              fontFamily: 'Avenir',
              letterSpacing: 1
            }}>
            {name.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  setAnimationValue: function(value) {
    this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
      left: (deviceWidth * value) / this.props.tabs.length
    }));
  },

  render: function() {
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: deviceWidth / numberOfTabs,
      height: 1,
      backgroundColor: '#000',
      bottom: 0,
    };

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <View style={tabUnderlineStyle} ref={TAB_UNDERLINE_REF} />
      </View>
    );
  },
});

module.exports = CustomTabBar;