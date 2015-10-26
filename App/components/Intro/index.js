var React = require('react-native');
var styles = require('./styles.js');

var Swiper = require('react-native-swiper-fork');
var Animatable = require('react-native-animatable');
var LocalStorage = require('../../utils/LocalStorage');

var Tabs = require('../Tabs');


var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StatusBarIOS,
  Animated
} = React


var Intro = React.createClass({

  getInitialState: function() {
    return {
      previousSlide: 0
    }
  },

  componentWillMount: function() {
    StatusBarIOS.setHidden(true);
  },

  _onMomentumScrollEnd: function (e, state, context) {

    if(context.state.index == 3) {
      this.refs.startButton.slideInUp(200);
    } else {
      if(this.state.previousSlide == 3) {
        this.refs.startButton.fadeOutDown(200);
      } 
    }

    this.setState({previousSlide : state.index});
  },

  _getStarted: function() {
    LocalStorage.updateIntroState();
    this.props.replaceRoute({
      component: Tabs,
      name: 'Stories',
    })
  },

  render: function() {
    return (
      <View>
        <Swiper style={styles.wrapper}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        showsButtons={false}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.3)', width: 6, height: 6,borderRadius: 4, marginLeft: 4, marginRight: 4,}} />}
        activeDot={<View style={{backgroundColor: '#000', width: 6, height: 6, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
        loop={false}
        >
          <View style={styles.slide}>
            <View style={styles.centeredContent}>
              <View style={{marginBottom: 10}}>
                <Image style={{width:200,height:200}} source={require('image!logo-stories')} />
              </View>
              <Text style={styles.title}>Stories </Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.text}>/r/WritingPrompts reader.</Text>
              </View>
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.centeredContent}>
              <View style={{marginBottom: 10}}>
                <Image style={{width:200,height:200}} source={require('image!letter')} />
              </View>
              <Text style={styles.title}>Optimized</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.text}>Designed for a better reading experience.</Text>
              </View>
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.centeredContent}>
              <View style={{marginBottom: 10}}>
                <Image style={{width:200,height:200}} source={require('image!bookmark')} />
              </View>
              <Text style={styles.title}>Bookmarks</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.text}>Read prompts later, even if you're offline.</Text>
              </View>
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.centeredContent}>
              <View style={{marginBottom: 10}}>
                <Image style={{width:200,height:200}} source={require('image!text-to-speech')} />
              </View>
              <Text style={styles.title}>Listen</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.text}>Text-to-speech technology enabled.</Text>
              </View>
            </View>
          </View>
        </Swiper>
        <Animatable.View ref="startButton" style={styles.startButton}>
          <TouchableHighlight activeOpacity={1} underlayColor="#942D2D" style={styles.startButtonTouch} onPress={this._getStarted}>
            <Text style={styles.startButtonText}>Let's get started</Text>
          </TouchableHighlight>
        </Animatable.View>
      </View>
    )
  }
})

module.exports = Intro;
