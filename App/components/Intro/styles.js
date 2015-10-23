var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    color: '#333',
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: '#8C9CA9',
    fontFamily: 'Avenir'
  },
  startButton: {
    margin: 20,
    bottom: 20,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    alignItems: 'stretch',
    backgroundColor: '#802727',
    transform: [
      {translateY: 100}
    ]
  },
  startButtonTouch: {
    flex:1,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'

  },
  startButtonText: {
    color: '#FFF',
    fontFamily: 'Avenir'
  }
});

StyleSheet.flatten = require('flattenStyle');

module.exports = styles;
