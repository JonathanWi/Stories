var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFD',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  body: {
    fontSize: 17.3,
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Georgia',
    lineHeight: 30
  },
  author: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Avenir',
    lineHeight: 20,
    letterSpacing : 1
  },
  iconReply: {
    fontSize: 24,
    padding: 0
  },
  textReply: {
    fontSize: 18,
    color: '#8C9CA9',
    fontFamily: 'Avenir',
    paddingLeft: 5,
  },
  textSpeech: {
    fontSize: 12,
    color: '#8C9CA9',
    fontFamily: 'Avenir',
    paddingLeft: 5,
  },
  top: {
    marginTop: 20,
    flexDirection:'row',
    marginBottom: 10,
  }
})

module.exports = styles;
